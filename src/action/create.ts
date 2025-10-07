"use server";

import { getUserSession } from "@/helpers/getUserSession";

export const createBlogs = async (data: FormData, image?: File | null) => {
  const session = await getUserSession();
  if (!session?.user?.id || !session.user.accessToken) {
    throw new Error("Not authenticated");
  }

  const blogInfo = Object.fromEntries(data.entries());

  const formData = new FormData();
  formData.append("title", blogInfo.title as string);

  const slug =
    (blogInfo.slug as string) ||
    (blogInfo.title as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  formData.append("slug", slug);
  formData.append("content", blogInfo.content as string);
  formData.append("excerpt", (blogInfo.excerpt as string) || "");
  if (blogInfo.tags) {
    const tags = blogInfo.tags
      .toString()
      .split(",")
      .map((t) => t.trim());
    tags.forEach((t) => formData.append("tags", t));
  }

  formData.append("isFeatured", String(blogInfo.isFeatured));
  formData.append("authorId", session.user.id);

  if (image) {
    formData.append("coverImage", image);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`, // ✅ token
    },
  });

  const result = await res.json();
  if (!res.ok) {
    console.error("Blog creation failed:", result);
    throw new Error(result.message || "Failed to create blog");
  }

  return result;
};

export const createProjects = async (data: FormData, image?: File | null) => {
  const session = await getUserSession();
  if (!session?.user?.id || !session.user.accessToken) {
    throw new Error("Not authenticated");
  }

  const projectInfo = Object.fromEntries(data.entries());
  const formData = new FormData();

  formData.append("title", projectInfo.title as string);

  const slug =
    (projectInfo.slug as string) ||
    (projectInfo.title as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // replace spaces/symbols
      .replace(/(^-|-$)+/g, ""); // trim -

  formData.append("slug", slug);
  formData.append("description", projectInfo.description as string);

  if (projectInfo.features) {
    const features = projectInfo.features
      .toString()
      .split(",")
      .map((f) => f.trim());

    formData.append("features", JSON.stringify(features));
  }

  if (projectInfo.liveUrl)
    formData.append("liveUrl", projectInfo.liveUrl as string);
  if (projectInfo.frontendRepoUrl)
    formData.append("frontendRepoUrl", projectInfo.frontendRepoUrl as string);
  if (projectInfo.backendRepoUrl)
    formData.append("backendRepoUrl", projectInfo.backendRepoUrl as string);

  if (image) {
    formData.append("thumbnail", image);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to create project");
  }

  return result;
};