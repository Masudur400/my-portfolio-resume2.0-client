"use server";
import { FieldValues } from "react-hook-form";

export const register = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res?.ok) {
    console.error("User Registration Failed", await res.text());
  }
  return await res.json();
};

// export const login = async (data: FieldValues) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//     credentials: "include",
//   });
//   if (!res.ok) {
//     console.error("Login Failed", await res.text());
//     throw new Error("Login failed");
//   }

//   return await res.json();
// };