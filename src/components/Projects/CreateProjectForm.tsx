/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import SingleImageUploader from "@/components/SingleImageUploader";
import { createProjects } from "@/action/create";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

interface FeatureOrTech {
  value: string;
}

interface FormValues {
  title: string;
  slug?: string;
  description: string;
  features: FeatureOrTech[];
  technologies: FeatureOrTech[];
  liveUrl?: string;
  frontendRepoUrl?: string;
  backendRepoUrl?: string;
}

export default function CreateProjectForm() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      features: [{ value: "" }],
      technologies: [{ value: "" }],
      liveUrl: "",
      frontendRepoUrl: "",
      backendRepoUrl: "",
    },
  });

  const { fields: featureFields, append: appendFeature, remove: removeFeature } =
    useFieldArray({
      control: form.control,
      name: "features",
    });

  const { fields: techFields, append: appendTech, remove: removeTech } =
    useFieldArray({
      control: form.control,
      name: "technologies",
    });

  const handleSubmit = async (data: FormValues) => {
    if (!image) {
      toast.error("Please add a thumbnail image");
      return;
    }


    const finalData = form.getValues();

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", finalData.title);
      formData.append("slug", finalData.slug || finalData.title);
      formData.append("description", finalData.description);

      finalData.features
        .map((f) => f.value.trim())
        .filter((v) => v)
        .forEach((f) => formData.append("features", f));

      finalData.technologies
        .map((t) => t.value.trim())
        .filter((v) => v)
        .forEach((t) => formData.append("technologies", t));

      if (finalData.liveUrl) formData.append("liveUrl", finalData.liveUrl);
      if (finalData.frontendRepoUrl)
        formData.append("frontendRepoUrl", finalData.frontendRepoUrl);
      if (finalData.backendRepoUrl)
        formData.append("backendRepoUrl", finalData.backendRepoUrl);
      formData.append("thumbnail", image);

      const result = await createProjects(formData, image);
      toast.success("Project created successfully!");
      form.reset();
      setImage(null);
      console.log(result);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="max-w-3xl mx-auto p-8 bg-white/5 backdrop-blur-md border-2 shadow-2xl rounded-2xl space-y-8"
    >

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent">
          Create New Project
        </h2>
      </div>

      {/* Title */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold mb-3 text-gray-200">
          Title *
        </label>
        <input
          {...form.register("title")}
          placeholder="(serial) Title"
          required
          className="w-full px-4 py-2 bg-white/5 border rounded-xl text-white"
        />
      </div>

      {/* Features */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-gray-200 font-semibold">Features</label>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => appendFeature({ value: "" })}
          >
            <Plus />
          </Button>
        </div>
        {featureFields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...form.register(`features.${idx}.value` as const)}
              placeholder={`Feature ${idx + 1}`}
              className="flex-1 px-4 py-2 bg-white/5 border rounded-xl text-white"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeFeature(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-gray-200 font-semibold">Technologies</label>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => appendTech({ value: "" })}
          >
            <Plus />
          </Button>
        </div>
        {techFields.map((field, idx) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...form.register(`technologies.${idx}.value` as const)}
              placeholder={`Technology ${idx + 1}`}
              className="flex-1 px-4 py-2 bg-white/5 border rounded-xl text-white"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeTech(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>

      {/* URLs */}
      <label className="block text-sm font-semibold mb-3 text-gray-200">
        Live Url *
      </label>
      <input
        {...form.register("liveUrl")}
        placeholder="Live URL"
        type="url"
        className="w-full px-4 py-2 bg-white/5 border rounded-xl text-white"
      />

      <label className="block text-sm font-semibold mb-3 text-gray-200">
        Frontend Repo Url *
      </label>
      <input
        {...form.register("frontendRepoUrl")}
        placeholder="Frontend Repo URL"
        type="url"
        className="w-full px-4 py-2 bg-white/5 border rounded-xl text-white"
      />

      <label className="block text-sm font-semibold mb-3 text-gray-200">
        Backend Repo Url *
      </label>
      <input
        {...form.register("backendRepoUrl")}
        placeholder="Backend Repo URL"
        type="url"
        className="w-full px-4 py-2 bg-white/5 border rounded-xl text-white"
      />

      {/* Description */}
      <label className="block text-sm font-semibold mb-3 text-gray-200">
        Description *
      </label>
      <textarea
        {...form.register("description")}
        placeholder="Description"
        required
        rows={5}
        className="w-full px-4 py-2 bg-white/5 border rounded-xl text-white"
      />

      {/* Thumbnail */}
      <div>
        <label className="text-gray-200 font-semibold mb-2">Thumbnail</label>
        <SingleImageUploader onChange={setImage} />
      </div>

      <Button
        type="submit"
        disabled={loading}
        size="lg"
        className="w-full mt-6 text-white bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 hover:from-blue-700 hover:via-indigo-800 hover:to-blue-900"
      >
        {loading ? "Publishing..." : "Publish Project"}
      </Button>
    </form>
  );
}
