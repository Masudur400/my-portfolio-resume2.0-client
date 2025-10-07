
'use client'
import React, { useEffect, useState } from 'react';   
import ProjectCard from './ProjectCard';
interface IProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string | null;
  features:string[]
  technologies:string[]
  liveUrl?: string | null;
  frontendRepoUrl?: string | null;
  backendRepoUrl?: string | null;
  createdAt: string;
}

const AllProjects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`);
        const data = await res.json();

        if (data.success) {
          const projectsArray = Array.isArray(data.data) ? data.data : [data.data];
          setProjects(projectsArray);
        } else {
          console.error("Failed to fetch projects:", data.message);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-white text-center p-6">Loading projects...</div>;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      
      {
        projects?.map(project => <ProjectCard project={project} key={project?.id}></ProjectCard>)
      }
    </div>
  );
};

export default AllProjects;