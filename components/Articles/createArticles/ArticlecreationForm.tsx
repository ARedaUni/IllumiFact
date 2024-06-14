import { Dispatch, SetStateAction, useRef, useState } from "react";
import { articles, handleImageUpload } from "@/Types/allTypes";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert } from "@material-tailwind/react";
import SunEditor from "suneditor-react";
import { articleSchema, ArticleFormData } from "@/utils/zodSchemas/schemas";
import SunEditorCore from "suneditor/src/lib/core";
import { ArticleCreationFormProps } from "@/Types/allTypes";

export default function ArticlecreationForm({
  handleImageUpload,
  image,
  register,
  errors,
}: ArticleCreationFormProps) {
  const [errormessage, setErrorMessage] = useState<string>("");
  const [errordetected, setErrorDetected] = useState(false);
  console.log(errors)
  return (
    <div className="container mx-auto mt-8 mb-9 px-4 ">
      <h1 className="text-3xl font-semibold mb-4">Create New Article</h1>

      <div className="mb-2">
        <label
          htmlFor="title"
          className="block text-gray-700 font-bold text-xl mb-2"
        >
          Title:
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        {errors.title && (
          <Alert className="mt-2" color="red">
            {errors.title.message}
          </Alert>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor="author_name"
          className="block text-gray-700 font-bold text-xl mb-2"
        >
          Author:
        </label>
        <input
          id="author_name"
          {...register("author_name")}
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        {errors.author_name && (
          <Alert className="mt-2" color="red">
            {errors.author_name.message}
          </Alert>
        )}
      </div>

      <div className="mb-2">
        <label
          htmlFor="claimedSummary"
          className="block text-gray-700 font-bold text-xl mb-2"
        >
          What was claimed:
        </label>
        <textarea
          id="claimedSummary"
          {...register("claimedSummary")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
          required
        />
        {errors.claimedSummary && (
          <Alert color="red">{errors.claimedSummary.message}</Alert>
        )}
      </div>

      <label className="block text-gray-700 font-bold text-xl mb-2">
        Our conclusion:
      </label>
      <textarea
        {...register("ourConclusion")}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows={5}
        required
      />
      {errors.ourConclusion && (
        <Alert color="red">{errors.ourConclusion.message}</Alert>
      )}
      <div className="mb-2">
        <label className="block text-gray-700 font-bold text-xl mb-2">
          Summary:
        </label>
        <textarea
          {...register("summary")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={5}
          required
          maxLength={250}
        />
        {errors.summary && <Alert color="red">{errors.summary.message}</Alert>}
      </div>
      <div className="mb-4">
        <label
          htmlFor="type"
          className="block text-gray-700 font-bold text-xl mb-2"
        >
          Type:
        </label>
        <select
          id="type"
          {...register("type")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="domestic">Domestic</option>
          <option value="foreign">Foreign</option>
        </select>
      </div>

      <div className="mb-2">
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

        {image && (
          <img src={image} alt="Preview" className="mt-2 rounded-md max-h-48" />
        )}
      </div>

     
    </div>
  );
}
