"use client";
import { Textarea, Button, IconButton } from "@material-tailwind/react";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import { commentBoxProps, commentboxProps } from "@/Types/allTypes";
import { createClient } from "@/utils/supabase/supabase";
import { useRouter } from "next/router";
export default function CommentBox({ user, submitComment }: commentBoxProps) {
  
  const [commentbox, setCommentbox] = useState("");
  

  return (
    <div>
      <form>
        <div className="mt-16">
          <Textarea
            className="border-gray-300 border-2 p-2 rounded-md min-h-[185px]"
            onChange={(e) => {
              setCommentbox(e.target.value);
            }}
            value={commentbox}
            variant="static"
            placeholder="Your Comment"
            rows={8}
          />
          <div className="flex w-full justify-between py-1.5">
           <div></div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCommentbox("");
                }}
                color="red"
                className="rounded-md bg-red-900 border-red-600 p-1 text-white"
              >
                Cancel
              </button>
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {submitComment(e, commentbox, user)}}
                className="rounded-md bg-gradient-to-br from-blue-700 to-purple-500 p-1 text-white"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
