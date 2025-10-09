/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Card } from "../ui/card";
import { X } from "lucide-react";

interface Project {
    id: number;
    title: string;
    slug: string;
    features: string[];
    technologies: string[];
    description: string;
    thumbnail?: string | null;
    liveUrl?: string | null;
    frontendRepoUrl?: string | null;
    backendRepoUrl?: string | null;
    createdAt: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    const [open, setOpen] = useState(false);
    const img = 'https://ik.imagekit.io/masudur/project-cover.png';

    return (
        <>
            <Card className="mb-10 custom-card mt-5 group shadow-lg shadow-indigo-800 bg-gradient-to-br from-gray-900/5 via-gray-800 to-black/5 rounded-xl overflow-hidden transition-shadow duration-300 hover:border-indigo-900">
                {/* Thumbnail */}
                <div className="relative w-full h-48">
                    <img
                        src={project?.thumbnail ?? img}
                        alt="Project Thumbnail"
                        className="w-[500px] h-[200px]"
                    />
                </div> 
                    {/* Title */}
                    <h3 className="text-2xl font-bold px-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                        {project?.title?.includes(".") || project?.title?.includes(",")
                            ? project?.title?.split(/[.,]/).slice(1).join(".").trim()
                            : project?.title}
                    </h3>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 px-2">
                        {project?.technologies?.map((item, idx) => (
                            <span
                                key={idx}
                                className="text-[10px] bg-gray-800 px-2 py-1 rounded-md flex items-center gap-1 group-hover:text-indigo-400"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* Features */}
                    <div className="flex-grow px-2 space-y-1">
                        {project?.features?.map((item, idx) => (
                            <p
                                key={idx}
                                className="text-sm "
                            >
                                ✅ {item}
                            </p>
                        ))}
                    </div>

                    <div className="flex justify-end px-2">
                        {/* See More Button */}
                        <button
                            onClick={() => setOpen(true)}
                            className="text-sm underline font-medium hover:text-indigo-600 text-indigo-400"
                        >
                            See More
                        </button>
                    </div>

                    {/* Buttons / Links */}
                    <div className="flex justify-around px-2">
                        {project?.liveUrl && (
                            <Link
                                href={project.liveUrl}
                                target="_blank"
                                className="outer-cont custom-card btn-flex flex items-center w-fit"
                            >
                                Live Link
                            </Link>
                        )}

                        {project?.frontendRepoUrl && (
                            <Link
                                href={project.frontendRepoUrl}
                                target="_blank"
                                className="outer-cont custom-card btn-flex flex items-center w-fit gap-1"
                            >
                                <FaGithub /> Frontend
                            </Link>
                        )}

                        {project?.backendRepoUrl && (
                            <Link
                                href={project.backendRepoUrl}
                                target="_blank"
                                className="outer-cont custom-card btn-flex flex items-center w-fit gap-1"
                            >
                                <FaGithub /> Backend
                            </Link>
                        )} 
                    </div> 
            </Card>

            {/* Modal */}
            {open && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="relative bg-gray-900 rounded-2xl shadow-xl border border-gray-700 max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
      {/* Close Button */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
      >
        <X size={22} />
      </button>

      {/* Thumbnail Image */}
      {/* {project.thumbnail && (
        <div className="relative mb-5 rounded-lg overflow-hidden mt-5">
          <img
            src={project.thumbnail ?? img}
            alt={project.title}
            className="h-60 w-full rounded-lg object-cover"
          />
        </div>
      )} */}

      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>

      {/* Technologies */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-5 flex-wrap">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="bg-indigo-600/20 text-indigo-300 text-xs px-2 py-1 rounded-full border border-indigo-600/40"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="text-gray-300 leading-relaxed mb-4">
        <p className="font-medium text-gray-200 mb-2">Features:</p>
        <ul className="list-disc list-inside space-y-1">
          {project.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>

      {/* Description */}
      <div className="text-gray-300 leading-relaxed">
        <p className="font-medium text-gray-200 mb-2">Description:</p>
        <p>{project.description}</p>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 justify-end mt-6">
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            className=" bg-gray-800 hover:bg-gray-700 custom-card text-white px-4 py-2 rounded-md transition"
          >
            Live Site
          </Link>
        )}
        {project.frontendRepoUrl && (
          <Link
            href={project.frontendRepoUrl}
            target="_blank"
            className="bg-gray-800 custom-card hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-1 transition"
          >
            <FaGithub /> Frontend
          </Link>
        )}
        {project.backendRepoUrl && (
          <Link
            href={project.backendRepoUrl}
            target="_blank"
            className="bg-gray-800 hover:bg-gray-700 custom-card text-white px-4 py-2 rounded-md flex items-center gap-1 transition"
          >
            <FaGithub /> Backend
          </Link>
        )}
        <button
          onClick={() => setOpen(false)}
          className="bg-gray-800 hover:bg-gray-700 custom-card text-white px-4 py-2 rounded-md transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
        </>
    );
};

export default ProjectCard;
