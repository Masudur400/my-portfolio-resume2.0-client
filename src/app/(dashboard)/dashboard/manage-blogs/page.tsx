/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button"; 
import Image from "next/image";
import Swal from "sweetalert2"; 
import { deleteBlog } from "@/action/delete";
import UpdateBlogModal from "@/components/Modals/UpdateBlogModal";


interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  coverImage?: string | null;
}

const BlogsTable = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
          credentials: "include",
        });
        const json = await res.json();

        
        if (Array.isArray(json.data)) {
          setBlogs(json.data);
        } else {
          console.error("Unexpected blogs format:", json);
          toast.error("Unexpected API response format");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);



  // Delete blog
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBlog(id);

      Swal.fire("Deleted!", "Blog has been deleted.", "success");  
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      Swal.fire("Error!", err.message || "Failed to delete blog", "error"); 
    }
  };
 


  return (
    <div className="p-6 bg-white/5 backdrop:blur-md rounded-xl shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6">All Blogs {blogs.length}</h2>

      {loading ? (
        <p className="text-gray-400">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-400">No blogs found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="p-3 text-left">No.</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr
                key={blog.id}
                className="border-b border-gray-700 hover:bg-gray-800/50"
              >
                <td className="p-3 text-white">{blogs.indexOf(blog) + 1}</td>
                <td className="p-3">
                  {blog.coverImage ? (
                    <Image
                      width={40}
                      height={40}
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-12 h-12 object-cover rounded-md border border-gray-700"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>
                <td className="p-3 text-white">{blog.title}</td>
                <td className="p-3 text-gray-400">{blog.slug}</td>
                <td className="p-3 text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex justify-end gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                    onClick={() => setSelectedBlog(blog)} // open modal
                  >
                    Update
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

         {selectedBlog && (
        <UpdateBlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          onUpdated={(updated) =>
            setBlogs((prev) =>
              prev.map((b) => (b.id === updated.id ? updated : b))
            )
          }
        />
      )}
    </div>
  );
};

export default BlogsTable;