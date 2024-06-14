import { Database } from "@/supabase";
import { AuthError, Session } from "@supabase/supabase-js";
import { ChangeEvent, Dispatch, MouseEventHandler, MutableRefObject, SetStateAction } from "react";
import { User } from "@supabase/supabase-js";
import SunEditorCore from "suneditor/src/lib/core";
import SunEditor from "suneditor-react";
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
  type?: "domestic" | "foreign" | undefined;
}
export type comments = Database['public']['Tables']['comments']['Row']
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
    comments: Database["public"]["Tables"]["comments"]["Row"][] | null;
    user: Database["public"]["Tables"]["users"]["Row"][] | null;
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

export interface User {
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


export interface ArticleCreationFormProps {
  setSendData: Dispatch<SetStateAction<Partial<articles>>>;
  sendData: Partial<articles>;
  handleImageUpload: handleImageUpload;
  image: string | null;
  submitArticle: () => void;
  editorRef: MutableRefObject<SunEditor | undefined>;
  getSunEditorInstance: (sunEditor: SunEditor) => void;
}