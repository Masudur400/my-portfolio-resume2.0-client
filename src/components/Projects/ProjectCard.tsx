/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Card } from "../ui/card";

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
            <Card className="mb-10 mt-5 group shadow-lg shadow-indigo-800 bg-gradient-to-br from-gray-900/5 via-gray-800 to-black/5 rounded-xl overflow-hidden transition-shadow duration-300 hover:border-indigo-900">
                {/* Thumbnail */}
                <div className="relative w-full h-48">
                    <img
                        src={project?.thumbnail ?? img}
                        alt="Project Thumbnail"
                        className="w-[500px] h-[200px]"
                    />
                </div> 
                    {/* Title */}
                    <h3 className="text-2xl font-bold px-2">
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
                                className="px-3 py-1 rounded-md bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 hover:from-blue-700 hover:via-indigo-800 hover:to-blue-900 transition-all duration-300 text-sm font-medium"
                            >
                                Live Link
                            </Link>
                        )}

                        {project?.frontendRepoUrl && (
                            <Link
                                href={project.frontendRepoUrl}
                                target="_blank"
                                className="px-3 py-1 rounded-md bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-gray-950 transition-all duration-300 text-sm font-medium flex items-center gap-1"
                            >
                                <FaGithub /> Frontend
                            </Link>
                        )}

                        {project?.backendRepoUrl && (
                            <Link
                                href={project.backendRepoUrl}
                                target="_blank"
                                className="px-3 py-1 rounded-md bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:via-gray-900 hover:to-gray-950 transition-all duration-300 text-sm font-medium flex items-center gap-1"
                            >
                                <FaGithub /> Backend
                            </Link>
                        )} 
                    </div> 
            </Card>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto p-4">
                    <div className="bg-gray-900 text-white rounded-xl w-full max-w-2xl p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-white text-lg font-bold"
                        >
                            ✕
                        </button> 
                        <h2 className="text-2xl font-bold mb-3">{project.title}</h2> 
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, i) => (
                                <span
                                    key={i}
                                    className="text-[12px] bg-gray-800 px-2 py-1 rounded-md"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Features */}
                        <div className="my-3">
                            {project.features.map((f, i) => (
                                <p key={i}>✅ {f}</p>
                            ))}
                        </div> 
                        <p className="my-2 font-medium">Description :</p>
                        <p className="mb-3">{project.description}</p>  
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectCard;
