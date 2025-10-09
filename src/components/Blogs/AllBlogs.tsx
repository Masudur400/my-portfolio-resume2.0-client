'use client'
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import Loading from '../Loading/Loading';


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

const AllBlogs = () => {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`);  
        const data = await res.json();

        if (data.success) { 
          const blogsArray = Array.isArray(data.data) ? data.data : [data.data];
          setBlogs(blogsArray);
        } else {
          console.error("Failed to fetch blogs:", data.message);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loading></Loading>


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      {
        blogs?.map((blog, idx) => <BlogCard key={idx} blog={blog}></BlogCard>)
      }
    </div>
  );
};

export default AllBlogs;