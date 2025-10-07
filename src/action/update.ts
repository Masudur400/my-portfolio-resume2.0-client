"use server";
import { getUserSession } from "@/helpers/getUserSession";

export const updateBlog = async (id: string, data: FormData) => {
  const session = await getUserSession();
  if (!session?.user?.id || !session.user.accessToken) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
    method: "PATCH",
    body: data, // ✅ send FormData directly
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,  
    },
  });

  const result = await res.json();
  if (!res.ok) {
    console.error("Blog update failed:", result);
    throw new Error(result.message || "Failed to update blog");
  }

  return result.data; 
};




export const updateProject = async (id: string, data: FormData) => {
  const session = await getUserSession();
  if (!session?.user?.id || !session.user.accessToken) {
    throw new Error("Not authenticated");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
    method: "PUT",
    body: data,  
    credentials: "include",
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`, 
    },
  });

  const result = await res.json();
  if (!res.ok) {
    console.error("Blog update failed:", result);
    throw new Error(result.message || "Failed to update blog");
  }

  return result.data; 
};