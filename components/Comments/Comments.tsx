"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/supabase";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { buildCommentTree } from "@/utils/usefulFunctions/buildcommentree";
import {
  updateCommentInTree,
  deleteCommentFromTree,
  addReplyToTree,
} from "@/utils/usefulFunctions/CommentTreefunctions";

import CommentTree from "./CommentTree";
import CommentBox from "./Commentbox";
import { commentsComponentProps, commentsProps, comments, user, users, Role, addreplies, Comment } from "@/Types/allTypes";
import { User } from "@supabase/supabase-js";

//type publicUser = users & {pfp:string; username:string}
type setCommentsTree = (prev: comments[]) => (comments | { depth: number; article_id: number; comment_id: number; commenter_id: string; commenter_name: string; content: string; created_at: string; pfp: string | null; })[]

export default function Comments({ user, comments, articleid }: commentsComponentProps) {
  const supabase = createClient();
  const image = "https://szitjksnkskfwbckrzfc.supabase.co/storage/v1/object/public/userprofilepictures/";
  const [edit, setEdit] = useState("");
  const [comment, setComments] = useState(comments);
  const [open, setOpen] = useState(false);
  const [openModals, setOpenModals] = useState({});
  const [role, setRole] = useState<Role|null|undefined>(null);
  const [commentTree, setCommentTree] = useState<comments[]|undefined>(buildCommentTree(comments));
  const handleOpen = (commentId: number) => {
    setOpenModals({ ...openModals, [commentId]: true });
  };
  const handleClose = (commentId: number) => {
    setOpenModals({ ...openModals, [commentId]: false });
  };
  async function deleteComment(id: number) {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("comment_id", id);

    if (!error) {
      // setCommentTree((prevCommentTree) =>
      //   deleteCommentFromTree(prevCommentTree, id)
      // );
      setCommentTree(deleteCommentFromTree(commentTree,id))
    }
  }
  useEffect(() => {
    const x = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const jwt = jwtDecode<JwtPayload & {user_role?:string}>(session.access_token);
        const userRole = jwt.user_role;
        setRole(userRole as Role);
      }
    });
  }, []);

  const initialOpenStates = comments?.reduce(
    (acc: Record<string, boolean>, comment) => {
      acc[comment.comment_id] = false;
      return acc;
    },
    {}
  );

  async function handleAddReply(parentCommentId:number, newComment:comments|addreplies) {
    setCommentTree(
      addReplyToTree(commentTree, parentCommentId, newComment as comments)
    );
  }
  async function updateComment(commentId: number) {
    if (edit.length > 0) {
      try {
        const { data, error } = await supabase
          .from("comments")
          .update({ content: edit, is_edited: true })
          .eq("comment_id", commentId)
          .select();

        if (error) {
          throw new Error(error.message);
        } else {
          setCommentTree((prevTree) => {
            const updatedTree = updateCommentInTree(prevTree, commentId, edit);
            return updatedTree;
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error updating comment:", err.message);
        }
      }
    }
  }

  async function submitComment(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, commentbox:string, user: users|undefined) {
    e.preventDefault();
    if (!user) {
      window.location.assign("/login");
    } else {
      const response = await supabase
        .from("comments")
        .insert({
          content: commentbox,
          commenter_id: user.id,
          article_id: articleid,
          commenter_name: user.username as string,
          pfp: user.pfp,
          parent_id: null,
          is_edited: false
        } 
      )
        .select();
        if (response.error) {
          console.error("Error submitting comment:", response.error);
          return; 
        }
        setCommentTree([{ ...response.data[0], depth: 0, parent_id:null }, ...commentTree as Array<comments>]);
    }
  }
  return (
    <>
      <CommentBox
        user={user?.[0]}
        submitComment={submitComment}
      />
      {comments && comments.length > 0 ? (
        <section className=" mt-8 flex flex-col justify-start  antialiased  ">
          <h1 className="text-4xl font-extrabold">Comments</h1>
          <div className="container tablet:min-w-full px-0  sm:px-5 max-w-[900px]">
            <CommentTree
              comments={commentTree}
              role={role}
              data={user}
              deleteComment={deleteComment}
              edit={edit}
              updateComment={updateComment}
              setCommentTree={setCommentTree}
              setEdit={setEdit}
              open={open}
              handleClose={handleClose}
              openModals={openModals}
              handleOpen={handleOpen}
              articleid={articleid}
              addReplyToTree={addReplyToTree}
              handleAddReply={handleAddReply}
            />
          </div>
        </section>
      ) : (
        <div></div>
      )}
    </>
  );
}