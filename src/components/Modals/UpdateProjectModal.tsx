/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "../ui/button";
import SingleImageUploader from "../SingleImageUploader";
import Image from "next/image";
import { updateProject } from "@/action/update";

interface UpdateProjectModalProps {
  project: any | null;
  onClose: () => void;
  onUpdated: (updated: any) => void;
}

const UpdateProjectModal = ({ project, onClose, onUpdated }: UpdateProjectModalProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [frontendRepoUrl, setFrontendRepoUrl] = useState("");
  const [backendRepoUrl, setBackendRepoUrl] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setSlug(project.slug || "");
      setDescription(project.description || "");
      setFeatures(project.features || []);
      setTechnologies(project.technologies || []);
      setFrontendRepoUrl(project.frontendRepoUrl || "");
      setBackendRepoUrl(project.backendRepoUrl || "");
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
      formData.append("description", description);
      formData.append("frontendRepoUrl", frontendRepoUrl);
      formData.append("backendRepoUrl", backendRepoUrl);

      features.forEach((f) => formData.append("features", f));
      technologies.forEach((t) => formData.append("technologies", t));

      if (image) formData.append("thumbnail", image);

      const updated = await updateProject(project.id, formData);
      Swal.fire("Updated!", "Project updated successfully.", "success");
      onUpdated(updated);
      onClose();
    } catch (err: any) {
      Swal.fire("Error!", err.message || "Failed to update project", "error");
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const handleRemoveFeature = (item: string) => {
    setFeatures(features.filter((f) => f !== item));
  };

  const handleRemoveTechnology = (item: string) => {
    setTechnologies(technologies.filter((t) => t !== item));
  };

  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center overflow-y-auto py-10">
      <div className="bg-gray-950 p-6 rounded-xl w-full max-w-2xl border border-gray-700 shadow-lg my-auto">
        <h2 className="text-xl font-bold text-white mb-6">Update Project</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title & Slug */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 min-h-[100px]"
              required
            />
          </div>

          {/* Repo URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Frontend Repo URL</label>
              <input
                type="text"
                value={frontendRepoUrl}
                onChange={(e) => setFrontendRepoUrl(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Backend Repo URL</label>
              <input
                type="text"
                value={backendRepoUrl}
                onChange={(e) => setBackendRepoUrl(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-gray-300 mb-1">Features</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature())}
                placeholder="Type and press Enter"
                className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              <Button type="button" onClick={handleAddFeature}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {features.map((f, i) => (
                <span
                  key={i}
                  onClick={() => handleRemoveFeature(f)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-700 transition"
                >
                  {f} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-gray-300 mb-1">Technologies</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTechnology())}
                placeholder="Type and press Enter"
                className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-600"
              />
              <Button type="button" onClick={handleAddTechnology}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {technologies.map((t, i) => (
                <span
                  key={i}
                  onClick={() => handleRemoveTechnology(t)}
                  className="bg-green-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-700 transition"
                >
                  {t} ✕
                </span>
              ))}
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-gray-300 mb-2">Thumbnail</label>
            <div className="flex items-center gap-4">
              <SingleImageUploader onChange={setImage} />
              {project.thumbnail && !image && (
                <Image
                  src={project.thumbnail}
                  alt="Current Thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md border border-blue-600 object-cover"
                />
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectModal;
