"use client";
import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import { createClient } from "@/utils/supabase/supabase";
import { useRouter } from "next/navigation";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { articles, articlesforzod } from "@/Types/allTypes";
import ArticlecreationForm from "@/components/Articles/createArticles/ArticlecreationForm";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ArticleFormData, articleSchema } from "@/utils/zodSchemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import SunEditor from "suneditor-react";
import { Alert } from "@material-tailwind/react";



// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.

    
 

export default function App() {
  const supabase = createClient();
  const editorRef = useRef<SunEditorCore>();
  const [imageObject, setImageObject] = useState<File>();
  const [formError, setFormError] = useState<{
    message: string;
    messages?: string[];
  } | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [authorID, setAuthorID] = useState(null);
  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editorRef.current = sunEditor;
  };
  const [sendData, setSendData] = useState<Partial<articlesforzod>>({
    title: "",
    content: "",
    type: "domestic",
    author_name: "",
    author_id: "04ce407b-236f-45e3-abc1-3105a1cda7a2",
    claimedSummary: "",
    ourConclusion: "",
    image: "",
    summary: "",
  });

  useEffect(() => {
    async function checkIfUser() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) useRouter().push("/login");
      setSendData({ ...sendData, author_id: data.user?.id });
    }
    checkIfUser();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: sendData,
  });
  async function uploadImageToSupabaseBucket(
    bucketName: string,
    imageName: string,
    image: File | null | any
  ) {
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(imageName, image, {
        cacheControl: "3600",
        upsert: false,
      });
  }

  const submitArticle: SubmitHandler<ArticleFormData> = async (data) => {
    if (editorRef.current !== null) {
      const content = editorRef.current.getContents(true);
      if (!content) {
        setFormError({ message: "Please enter article content." });
        return;
      }

      const final = { ...data, content, image: sendData.image };

      try {
        const { error } = await supabase.from("articles").insert<any>(final);

        if (imageObject && final.image) {
          await uploadImageToSupabaseBucket(
            "articleimages",
            final.image,
            imageObject
          );
        }

        useRouter().push("/success");
      } catch (error) {
        console.error("Error submitting article:", error);
        setFormError({ message: "An error occurred. Please try again later." });
      }
    }
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSendData({
        ...sendData,
        image: event.target.files[0].name,
      });
      setImage(URL.createObjectURL(event.target.files[0]));
      setImageObject(event.target.files[0]);
    }
  };

  return (
    <div className="flex mt-24 flex-col max-w-[250px] md:!min-w-[720px]">
      <form onSubmit={handleSubmit(submitArticle)} className="space-y-4">
        <ArticlecreationForm
          setSendData={setSendData}
          sendData={sendData}
          handleImageUpload={handleImageUpload}
          image={image}
          submitArticle={submitArticle}
          editorRef={editorRef}
          getSunEditorInstance={getSunEditorInstance}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors}
          control={control}
        />
        <Controller
          name="content"
          control={control} // Pass the control object to Controller
          render={({ field }) => (
            <SunEditor
              onChange={field.onChange}
              defaultValue={field.value}
              getSunEditorInstance={getSunEditorInstance}
              height="700px"
              setDefaultStyle="font-family: sans-serif; font-size: 18px;"
            />
          )}
        />
        {errors.content && <Alert color="red">{errors.content.message}</Alert>}
        <button
          type="submit"
          className="submitbutton p-1 mt-4  text-lg !bg-gradient-to-br !from-blue-700 !to-purple-500 rounded-md border-white border-2 text-white shadow-xl"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
}
