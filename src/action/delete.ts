/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { getUserSession } from "@/helpers/getUserSession";

export const deleteBlog = async (id: string) => {
  const session = await getUserSession();

  if (!session?.user?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`, 
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to delete blog");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Delete error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};
export const deleteProject = async (id: string) => {
  const session = await getUserSession();

  if (!session?.user?.accessToken) {
    throw new Error("Unauthorized");
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`, 
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || "Failed to delete blog");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Delete error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};