import { Database } from "@/supabase";
import { AuthError, Session } from "@supabase/supabase-js";
import { ChangeEvent, Dispatch, MouseEventHandler, MutableRefObject, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";
import SunEditorCore from "suneditor/src/lib/core";
import SunEditor from "suneditor-react";
import { UUID } from "crypto";
import { UseFormRegister } from "react-hook-form/dist/types/form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
export type articles = Database['public']['Tables']['articles']['Row']
export type articlesArray = Database['public']['Tables']['articles']['Row'][]
export type articlesforzod =  {
  ourConclusion: string;
  summary: string;
  title: string;
  author_name: string;
  claimedSummary: string;
  author_id: string;
  content: string;
  image: string;
  type?: "domestic" | "foreign" | undefined;
}
//export type comments = Database['public']['Tables']['comments']['Row']

export type Claim = {
  id:number,
  created_at: Date,
  claim_name: string;
  claim_content: string;
  claim_author_email: string;
  claim_author_id: UUID
};

export type comments = 
{
  article_id: number;
  comment_id: number;
  commenter_id: string;
  commenter_name: string;
  content: string;
  created_at: string;
  pfp: string | null;
  replies?: comments[];
  parent_id: number|null;
  depth?: number;
  is_edited?: boolean
}
export type commentsComponentProps = {
  user: users[]|null,
  comments: comments[] | null,
  articleid: number
}
export type commentBoxProps = {
  user: users|undefined,
  submitComment: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, commentbox: string, user: users|undefined) => Promise<void>
}
export type users = Database['public']['Tables']['users']['Row']
export type openModals = { [key: number]: boolean };
export type Comment = {
  content: string | undefined;
  commenter_id: string | undefined;
  article_id: string | undefined;
  commenter_name: string | null;
  pfp?: string | undefined; 
}
export type ImageType = File | null ;
export type claims = Database['public']['Tables']['claims']['Row'];
export interface CardDefaultProps {
    name: string;
    explanation: string;
    image: string; 
  }
export type  sessionType = {
    data: {
        session: Session;
    };
    error: null;
} | {
    data: {
        session: null;
    };
    error: AuthError;
} | {
    data: {
        session: null;
    };
    error: null;
}

export type articleDisplayPropsTypes = {
    post: articles;
}

export type commentboxProps = {
    submitComment: MouseEventHandler<HTMLButtonElement>; 
    commentbox: string;
    setCommentbox: Dispatch<SetStateAction<string>>;
}
export type commentsProps = {
    comments: Database["public"]["Tables"]["comments"]["Row"][];
    user: Database["public"]["Tables"]["users"]["Row"][] | null;
    articleid: string | null
  }

export type final = {
  content: string | undefined | SunEditorCore;
  title: string;
  type: string;
  author_name: string;
  author_id: string;
  claimedSummary: string;
  ourConclusion: string;
  image: string;
  summary: string;
}
export type handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => void

export interface user {
  id: string;
  aud: string;
  role: string;
  email?: string;
  email_confirmed_at?: string; // Note: This is slightly different from confirmed_at
  phone?: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  app_metadata: {
    provider?: string;
    providers?: string[];
  };
  user_metadata?: {
    [key: string]: any;
  };
  identities?: {
    id: string;
    user_id: string;
    identity_data: any;
    provider: string;
    last_sign_in_at: string;
    created_at: string;
    updated_at: string;
  }[];
  created_at: string;
  updated_at: string;
  factors?: any; // Optional field for multi-factor authentication (MFA)
  recovery_codes?: string[]; // Optional field for MFA recovery codes
}


// export interface ArticleCreationFormProps {
//   setSendData: Dispatch<SetStateAction<Partial<articles>>>;
//   sendData: Partial<articles>;
//   handleImageUpload: handleImageUpload;
//   image: string | null;
//   submitArticle: () => void;
//   editorRef: MutableRefObject<typeof SunEditor | undefined>;
//   getSunEditorInstance: (sunEditor: typeof SunEditor) => void;
//   handleSubmit: any,
//   register: any;
//   errors: any;
//   control: any;
// }
export interface ArticleCreationFormProps {
  handleImageUpload: handleImageUpload;
  image: string | null;
  register: UseFormRegister<{
    title: string;
    content: string;
    author_name: string;
    author_id: string;
    claimedSummary: string;
    ourConclusion: string;
    summary: string;
    type?: "domestic" | "foreign" | undefined;
}>;
  errors: FieldErrors<{
    author_id: string;
    author_name: string;
    claimedSummary: string;
    content: string;
    ourConclusion: string;
    summary: string;
    title: string;
    type?: "domestic" | "foreign" | undefined;
}>;
}
export enum Role {
  "moderator" = "moderator",
  "admin" = "admin"
} 
export type CommentActions = {
  comments: any; // Array of comments
  role: Role|null|undefined; // User's role
  data?: users[]|null|undefined; // Optional data for various functions
  deleteComment: (id: number) => void;
  edit: string;
  updateComment: (commentId:number) => void;
  setCommentTree: Dispatch<SetStateAction<any>>;
  setEdit: Dispatch<SetStateAction<string>>;
  open: boolean;
  openModals: openModals;
  handleClose: (commentId: number) => void;
  handleOpen: (commentId: number) => void;
  articleid: number;
  addReplyToTree: (comments: any, parentCommentId: any, newComment: any) => void;
  handleAddReply: (parentCommentId:number, newComment:addreplies) => void;
};

export type addreplies = {
  article_id: number;
  comment_id: number;
  commenter_id: string;
  commenter_name: string;
  content: string;
  created_at: string;
  pfp: string | null;
  parent_id?: number 
}

export type modalProps = {
  edit: string;
  setEdit: Dispatch<SetStateAction<string>>;
  item: comments;
  openModals: openModals;
  updateComment: (commentId:number) => void;
  open: boolean;
  handleClose: (commentId: number) => void;
}
export type user_roles = {
  user_role: Role
}

export type replyBox = {
  commentId: number,
  setReplyContent: Dispatch<SetStateAction<string>>,
  replyContent: string,
  setShowReplyBox: Dispatch<SetStateAction<{[key: number]: boolean}>>,
  setReplyingTo: Dispatch<SetStateAction<number | null>>,
  submitReply: (parentCommentId: number, articleid: number) => Promise<void>,
  showReplyBox: {[key: number]: boolean} ,
  articleid: number,
}