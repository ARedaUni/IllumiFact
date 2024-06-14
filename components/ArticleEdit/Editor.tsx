"use client";
import React, {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/supabase";
import { useParams, useRouter } from "next/navigation";
import { Alert } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { articles } from "@/Types/allTypes";
import ArticlecreationForm from "@/components/Articles/createArticles/ArticlecreationForm";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function App({ articlecontent }: {articlecontent: articles}) {
  //grabbed from https://www.tiny.cloud/docs/tinymce/latest/react-pm-bundle/
  const supabase = createClient();
  const imageURL =
  "https://szitjksnkskfwbckrzfc.supabase.co/storage/v1/object/public/articleimages/";
  const editorRef = useRef<SunEditorCore>();
  const { id } = useParams();
  const [errormessage, setErrorMessage] = useState<string>("");
  const [imageObject, setImageObject] = useState<File>();
  const [errordetected, setErrorDetected] = useState(false);
  const [errormessages, setErrorMessages] = useState<string[]>([]);
  const [isClientSide, setIsClientSide] = useState(false);
  const [image, setImage] = useState<string | null>(imageURL+articlecontent.image || "");
  const [sendData, setSendData] = useState<Partial<articles>>({
    title: articlecontent.title || "",
    content: articlecontent.content || "",
    type: articlecontent.type || "",
    author_name: articlecontent.author_name || "",
    author_id: articlecontent.author_id || "",
    claimedSummary: articlecontent.claimedSummary || "",
    ourConclusion: articlecontent.ourConclusion || "",
    image: articlecontent.image || "",
    summary: articlecontent.summary || "",
  });

 async function uploadImageToSupabaseBucket(bucketName: string, imageName: string, image: File|null|any) {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(imageName, image, {
        cacheControl: "3600",
        upsert: false,
      });
  };

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editorRef.current = sunEditor;
  };
  const log = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editorRef.current !== null) {
      const final = {
        ...sendData,
        content: editorRef?.current?.core.getContents(true),
      };
      const { error } = await supabase.from("articles").update<any>(final).eq('id', articlecontent.id);
      console.log(error)
      if (error) {
        console.log(error)
        if (
          error.message ===
          `new row for relation "articles" violates check constraint "articles_author_name_check"`
        ) {
          setErrorMessage("Author name must be longer than 6 characters");
        } else {
          setErrorMessage(error.message);
         
        }
        return;
      } else {
        uploadImageToSupabaseBucket(
          "articleimages",
          sendData.image as string,
          imageObject
        );
      }
    }
  };

  useEffect(() => {
    setIsClientSide(true);
    async function checkIfUser() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        return useRouter().push("/login");
      }
    }
    checkIfUser();
  }, []);

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
    <form onSubmit={log}>
      <div className="flex mt-24 flex-col max-w-[400px] md:!min-w-[720px]">
        <div className="container mx-auto mt-8 mb-9 px-4">
          <h1 className="text-3xl font-semibold mb-4">Edit Article</h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold text-xl mb-2"
              >
                Title:
              </label>
              <input
                id="title"
                type="text"
                value={sendData.title}
                onChange={(e) =>
                  setSendData({ ...sendData, title: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label
                htmlFor="author_name"
                className="block text-gray-700 font-bold text-xl mb-2"
              >
                Author:
              </label>
              <input
                id="author_name"
                type="text"
                value={sendData.author_name}
                onChange={(e) =>
                  setSendData({ ...sendData, author_name: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div>
              <label
                htmlFor="claimedSummary"
                className="block text-gray-700 font-bold text-xl mb-2"
              >
                What was claimed:
              </label>
              <textarea
                id="claimedSummary"
                value={sendData.claimedSummary as string}
               
                onChange={(e) =>
                  setSendData({ ...sendData, claimedSummary: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
                required
              />
            </div>

            <label className="block text-gray-700 font-bold text-xl mb-2">Our conclusion:</label>
        <textarea
          onChange={(e) => {
            setSendData({ ...sendData, ourConclusion: e.target.value });
          }}
          value={sendData.ourConclusion as string}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={5}
          required
        />
        
        <label className="block text-gray-700 font-bold text-xl mb-2">Summary:</label>
        <textarea
          onChange={(e) => {
            setSendData({ ...sendData, summary: e.target.value });
          }}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={5}
          value={sendData.summary as string}
          required
          maxLength={250}
        />

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold text-xl mb-2"
              >
                Type:
              </label>
              <select
                id="type"
                value={sendData.type}
                onChange={(e) =>
                  setSendData({ ...sendData, type: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="domestic">Domestic</option>
                <option value="foreign">Foreign</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold text-xl mb-2"
              >
                Image:
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
              {image ? (
                <Image
                  src={image}
                  alt="Preview of article image to be displayed to users"
                  className="mt-2 rounded-md max-h-48"
                  height={400}
                  width={360}
                /> 
              ): (<Image
                src={imageURL+image}
                alt="Preview of article image to be displayed to users"
                className="mt-2 rounded-md max-h-48"
                height={400}
                  width={360}
              /> )}
            </div>
          </form>
        </div>

        {isClientSide && (
          <SunEditor
            getSunEditorInstance={getSunEditorInstance}
            height="1000px"
            width="700px"
            defaultValue={articlecontent.content}
            setDefaultStyle="font-family: sans-serif; font-size: 18px;"
          />
        )}
        <div className="mt-4">
          <button
            type="submit"
            className="submitbutton p-1  text-lg !bg-gradient-to-br !from-blue-700 !to-purple-500 rounded-md border-white border-2 text-white shadow-xl"
          >
            Edit Article
          </button>
        </div>
      </div>
    </form>
  );
}
