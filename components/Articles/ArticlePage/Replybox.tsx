import { replyBox } from "@/Types/allTypes";
import { Textarea, IconButton, Button } from "@material-tailwind/react";

export default function ReplyBox({
  commentId,
  setReplyContent,
  replyContent,
  setShowReplyBox,
  setReplyingTo,
  submitReply,
  showReplyBox,
  articleid,
}: replyBox) {
  return (
    showReplyBox[commentId] && (
      <div className="mt-3">
        <Textarea
          className="border-gray-300 max-w border-2 p-2 rounded-md"
          onChange={(e) => {
            setReplyContent(e.target.value);
          }}
          value={replyContent}
          variant="static"
          placeholder="Your Comment"
          rows={8}
        />
        <div className="flex w-full justify-between py-1.5">
          <IconButton placeholder="" variant="text" color="blue-gray" size="sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </IconButton>
          <div className="flex gap-2">
            <Button
              placeholder=""
              onClick={(e) => {
                e.preventDefault();
                setReplyingTo(null);
                setReplyContent("");
                setShowReplyBox((prev: {[key:number]: boolean}) => ({ ...prev, [commentId]: false }));
              }}
              size="sm"
              color="red"
              variant="text"
              className="rounded-md p-2 border-2 border-red-400"
            >
              Cancel
            </Button>
            <button
              onClick={() => {
                submitReply(commentId, articleid);
              }}
              className="rounded-md bg-gradient-to-br from-blue-700 to-purple-500 p-1 text-white"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    )
  );
}
