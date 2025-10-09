/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Eye, ArrowUpRight, BookOpen, Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const BlogCard = ({ blog }: { blog: Blog }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className="group relative mb-10 mt-5 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-800 hover:border-indigo-600 shadow-md hover:shadow-indigo-800/40 transition-all duration-300 flex flex-col custom-card">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          {blog.coverImage && !imageError ? (
            <>
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className={`object-cover transition-all duration-700 ${
                  imageLoaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-105'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </>
          ) : (
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-600/10 to-purple-600/10">
              <BookOpen size={36} className="text-blue-400" />
            </div>
          )}

          {blog.published && (
            <div className="absolute top-4 left-4 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full">
              Published
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded-full border border-indigo-600/40"
              >
                <Tag size={12} /> {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-gray-400 text-xs">+{blog.tags.length - 3} more</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
            {blog.title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              <span>Read</span>
            </div>
          </div>

          {/* ✅ Fixed Read Button */}
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 mt-auto custom-card bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 text-white rounded-md py-2   transition-all duration-300"
          >
            <span>Read Article</span>
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>

      {/* ---- MODAL ---- */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="relative bg-gray-900 rounded-2xl shadow-xl border border-gray-700 max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X size={22} />
            </button>

            {/* Modal Image */}
            {blog.coverImage && (
              <div className="relative mb-5 rounded-lg overflow-hidden mt-5">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="h-60 w-full rounded-lg object-cover"
                />
              </div>
            )}

            {/* Modal Content */}
            <h2 className="text-2xl font-bold text-white mb-3">{blog.title}</h2>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-5 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              {blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-indigo-600/20 text-indigo-300 text-xs px-2 py-1 rounded-full border border-indigo-600/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>

            <div className="mt-6 text-right">
              <Button
                type="button"
                onClick={() => setOpenModal(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCard;
