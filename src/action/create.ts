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
      Authorization: `Bearer ${session.user.accessToken}`, 
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

   
  const title = data.get("title") as string;
  const slug =
    (data.get("slug") as string) ||
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  const description = data.get("description") as string;
  const liveUrl = data.get("liveUrl") as string;
  const frontendRepoUrl = data.get("frontendRepoUrl") as string;
  const backendRepoUrl = data.get("backendRepoUrl") as string;

  
  const features = data.getAll("features") as string[];
  const technologies = data.getAll("technologies") as string[];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("slug", slug);
  formData.append("description", description);

  features.forEach((f) => formData.append("features", f));
  technologies.forEach((t) => formData.append("technologies", t));

  if (liveUrl) formData.append("liveUrl", liveUrl);
  if (frontendRepoUrl) formData.append("frontendRepoUrl", frontendRepoUrl);
  if (backendRepoUrl) formData.append("backendRepoUrl", backendRepoUrl);

  if (image) formData.append("thumbnail", image);

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

