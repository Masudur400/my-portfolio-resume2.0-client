/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react"; 
import Swal from "sweetalert2";
import { Button } from "../ui/button";
import SingleImageUploader from "../SingleImageUploader";
import Image from "next/image";
import { updateBlog } from "@/action/update";

interface UpdateBlogModalProps {
  blog: any | null;
  onClose: () => void;
  onUpdated: (updated: any) => void;
}

const UpdateBlogModal = ({ blog, onClose, onUpdated }: UpdateBlogModalProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setSlug(blog.slug || "");
      setContent(blog.content || "");
      setExcerpt(blog.excerpt || "");
      setTags(blog.tags || []);
    }
  }, [blog]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!blog) return;

  try { 
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt || ""); 
    tags.forEach((tag) => formData.append("tags", tag)); 
    if (image) formData.append("coverImage", image); 
    const updatedBlog = await updateBlog(blog.id, formData); 
    Swal.fire("Updated!", "Blog has been updated successfully.", "success"); 
    onUpdated(updatedBlog); 
    onClose();
  } catch (err: any) {
    console.error("Blog update failed:", err);
    Swal.fire("Error!", err.message || "Failed to update blog", "error");
  }
};

  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center overflow-y-auto py-10">
      <div className="bg-gray-950 p-6 rounded-xl w-full max-w-2xl border border-gray-700 shadow-lg my-auto">
        <h2 className="text-xl font-bold text-white mb-6">Update Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Two-column grid for title + slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="Enter blog title"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                placeholder="unique-blog-slug"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-300 mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 min-h-[120px]"
              placeholder="Write your blog content..."
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-gray-300 mb-1">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 min-h-[80px]"
              placeholder="Short description..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-300 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags.join(", ")}
              onChange={(e) =>
                setTags(
                  e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== "")
                )
              }
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              placeholder="e.g. tech, react, nextjs"
            />
          </div>

          {/* Image uploader in flex row */}
          <div>
            <label className="block text-gray-300 mb-2">Cover Image</label>
            <div className="flex items-center gap-4">
              <SingleImageUploader onChange={setImage} />
              {blog.coverImage && !image && (
                <Image
                  src={blog.coverImage}
                  alt="Current cover"
                  width={80}
                  height={300}
                  className="rounded-md border border-blue-600 object-cover"
                />
              )}
              {image && (
                <p className="text-sm text-green-400">New image selected</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button 
              onClick={onClose}

            >
              Cancel
            </Button>
            <Button
              type="submit" 
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogModal;