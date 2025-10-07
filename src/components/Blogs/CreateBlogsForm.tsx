/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import SingleImageUploader from "@/components/SingleImageUploader";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button"; 
import { createBlogs } from "@/action/create";

export default function CreateBlogForm() {
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formEl = e.currentTarget;

    try {
      const formData = new FormData(formEl);
      formData.set("isFeatured", String(isFeatured));
      const result = await createBlogs(formData, image);

      toast.success("Blog created successfully!");
      console.log("Created blog:", result);

      formEl.reset();
      setImage(null);
      setIsFeatured(false);
    } catch (err: any) {
      console.error(err);
      toast.error(` ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white/5 backdrop:blur-md border-2 shadow-2xl rounded-2xl space-y-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <Toaster position="top-right" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
          Create New Blog Post
        </h2>
        <p className="text-gray-400 mt-2">Share your thoughts with the world</p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div className="group">
          <label htmlFor="title" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-blue-400 transition-colors">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="w-full px-4 py-3 bg-white/5 border rounded-md"
            placeholder="Enter a compelling title...(Must be 3 characters or more)"
          />
        </div>
        <div className="group">
          <label htmlFor="title" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-blue-400 transition-colors">
            Slug*
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            required
            className="w-full px-4 py-3 bg-white/5 border rounded-md"
            placeholder="Enter a compelling slug...(Must be 3 characters or more and must be unique)"
          />
        </div>



        {/* Content */}
        <div className="group">
          <label htmlFor="content" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-blue-400 transition-colors">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            rows={8}
            required
            className="w-full px-4 py-3 bg-white/5 border rounded-md"
            placeholder="Write your blog content here...(Must be 10 characters or more)"
          />
        </div>

        {/* Excerpt */}
        <div className="group">
          <label htmlFor="excerpt" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-blue-400 transition-colors">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border rounded-md"
            placeholder="Brief summary of your post (optional)..."
          />
        </div>

        {/* Tags */}
        <div className="group">
          <label htmlFor="tags" className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-blue-400 transition-colors">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="w-full px-4 py-3 bg-white/5 border rounded-md"
            placeholder="Next.js, React, Web Development (comma separated)"
          />
        </div>

        {/* Image Upload */}
        <div className="group">
          <label className="block text-sm font-semibold mb-3 text-gray-200 group-focus-within:text-blue-400 transition-colors">
            Cover Image
          </label>
          <div className="border-dashed bg-white/5 rounded-md">
            <SingleImageUploader onChange={setImage} />
          </div>
        </div>

        {/* Featured */}
        <div className="bg-white/5 border rounded-md p-6  ">
          <p className="block text-sm font-semibold mb-4 text-gray-200">Featured Post</p>
          <div className="flex gap-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="isFeatured"
                  value="true"
                  checked={isFeatured === true}
                  onChange={() => setIsFeatured(true)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${isFeatured === true
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-600 group-hover:border-gray-400'
                  }`}>
                  {isFeatured === true && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <span className="text-white group-hover:text-gray-200 transition-colors">Yes, feature this post</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="isFeatured"
                  value="false"
                  checked={isFeatured === false}
                  onChange={() => setIsFeatured(false)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 ${isFeatured === false
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-600 group-hover:border-gray-400'
                  }`}>
                  {isFeatured === false && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
              <span className="text-white group-hover:text-gray-200 transition-colors">No, keep it regular</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading} 
          size="lg"
          className="w-full mt-6 text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-700 hover:from-blue-600 hover:via-indigo-700 hover:to-blue-800"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Publishing Post...
            </div>
          ) : (
            'Publish Blog Post'
          )}
        </Button>
      </div>
    </form>
  );
}