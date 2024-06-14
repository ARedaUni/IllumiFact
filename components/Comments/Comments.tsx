"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/supabase";
import { jwtDecode } from "jwt-decode";
import { buildCommentTree } from "@/utils/usefulFunctions/buildcommentree";
import {
  updateCommentInTree,
  deleteCommentFromTree,
  addReplyToTree,
} from "@/utils/usefulFunctions/CommentTreefunctions";

import CommentTree from "./CommentTree";
import CommentBox from "./Commentbox";
type Claim = {
  comment_id: string;
  commenter_name: string;
  created_at: string;
  content: string;
  commenter_id: string;
  pfp: string;
};

export default function Comments({ user, comments, articleid }) {
  const supabase = createClient();
  const image = "https://szitjksnkskfwbckrzfc.supabase.co/storage/v1/object/public/userprofilepictures/";
  const [edit, setEdit] = useState("");
  const [comment, setComments] = useState(comments);
  const [open, setOpen] = useState(false);
  const [openModals, setOpenModals] = useState({});
  const [role, setRole] = useState(null);
  const [commentTree, setCommentTree] = useState(buildCommentTree(comments));
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
      setCommentTree((prevCommentTree) =>
        deleteCommentFromTree(prevCommentTree, id)
      );
    }
  }
  useEffect(() => {
    const x = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const jwt = jwtDecode(session.access_token);
        const userRole = jwt.user_role;
        setRole(userRole);
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

  async function handleAddReply(parentCommentId, newComment) {
    setCommentTree((prevCommentTree) =>
      addReplyToTree(prevCommentTree, parentCommentId, newComment)
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

  async function submitComment(e, commentbox) {
    e.preventDefault();
    if (!user) {
      window.location.assign("/login");
    } else {
      const { data, error } = await supabase
        .from("comments")
        .insert({
          content: commentbox,
          commenter_id: user[0].id,
          article_id: articleid,
          commenter_name: user[0].username,
          pfp: user[0].pfp,
        })
        .select();

      setCommentTree((prev) => [{ ...data[0], depth: 0 }, ...prev]);
    }
  }
  return (
    <>
      <CommentBox
        user={user?.[0]}
        params={articleid}
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