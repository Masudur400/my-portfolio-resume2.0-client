"use client";
import React from "react";
import { Calendar, Tag, Clock } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

interface BlogModalProps {
  blog: Blog | null;
  open: boolean;
  onClose: () => void;
}

const BlogModal = ({ blog, open, onClose }: BlogModalProps) => {
  if (!blog) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return `${Math.ceil(words / wordsPerMinute)} min read`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          w-full 
          max-w-5xl              
          max-h-[90vh] 
           overflow-y-auto    
          scrollbar-hide       
          bg-slate-950 
          text-white 
          border 
          border-slate-800 
          rounded-2xl 
          p-6 
          scroll-smooth          
        "
      >
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative w-full h-80 mb-6 mt-4">
            <Image
              fill
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-blue-400">
            {blog.title}
          </DialogTitle>
        </DialogHeader>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} /> {formatDate(blog.createdAt)}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} /> {calculateReadTime(blog.content)}
          </div>
        </div>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-500/30"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}

        <div className="prose prose-invert max-w-none prose-headings:text-blue-400 prose-headings:font-bold prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-500 hover:prose-a:text-blue-400 prose-ul:list-disc prose-li:ml-6 prose-li:my-1">
          {/* Example heading */}
          <h1 className="text-xl font-bold mb-4">{blog.slug}</h1>

          {/* Optional excerpt */}
          {blog.excerpt && (
            <p className="text-gray-300 text-lg mb-6">{blog.excerpt}</p>
          )}

          {/* Main content */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;