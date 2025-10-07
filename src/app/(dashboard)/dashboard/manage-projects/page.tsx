/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button"; 
import Image from "next/image";
import Swal from "sweetalert2";
import UpdateProjectModal from "@/components/Modals/UpdateProjectModal";
import { deleteProject } from "@/action/delete";  

 


interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string | null;
  createdAt: string;
}

const ProjectManagementTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
          credentials: "include",
        });
        const json = await res.json();

        if (Array.isArray(json.data)) {
          setProjects(json.data);
        } else {
          toast.error("Unexpected API response format");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Delete project
  const handleDelete = async (id: number) => {
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
      await deleteProject(id.toString());
      Swal.fire("Deleted!", "Project has been deleted.", "success");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      Swal.fire("Error!", err.message || "Failed to delete project", "error");
    }
  };

  return (
    <div className="p-6 bg-white/5 backdrop:blur-md rounded-xl shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6">
        All Projects ({projects.length})
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">No projects found.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="p-3 text-white">{index + 1}</td>
                <td className="p-3">
                  {project.thumbnail ? (
                    <Image
                      width={40}
                      height={40}
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-12 h-12 object-cover rounded-md border border-gray-700"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </td>
                <td className="p-3 text-white">{project.title}</td>
                <td className="p-3 text-gray-400">{project.slug}</td>
                <td className="p-3 text-gray-400">
                  {new Date(project.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex justify-end gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                    onClick={() => setSelectedProject(project)}  
                  >
                    Update
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Update */}
      {selectedProject && (
        <UpdateProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdated={(updated) =>
            setProjects((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            )
          }
        />
      )}
    </div>
  );
};

export default ProjectManagementTable;