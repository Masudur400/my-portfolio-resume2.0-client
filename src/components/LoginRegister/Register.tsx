"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { signIn } from "next-auth/react"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { register } from "@/action/auth";

export default function RegisterForm() {
    const form = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

   const onSubmit = async (values: FieldValues) => {
  const data = {
    name: values.name,
    email: values.email,
    password: values.password,
  };

  try {
    const res = await register(data);
    if (res?.success) {
      toast.success("Register Successful."); 
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      if (loginRes?.ok) {
        router.push("/");
      } else {
        toast.error("Auto login failed, please login manually.");
        router.push("/auth/login");
      }
    }
  } catch (error) {
    toast.error("Register Failed. Check your credentials.");
    console.log(error);
  }
};


    return (
        <div className="flex justify-center items-center min-h-screen ">
            <Card className="w-full max-w-md shadow-lg p-6 bg-white/5 backdrop:blur-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="name"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full mt-2 outer-cont btn-flex  items-center">
                                Register
                            </Button>
                        </form>
                    </Form>

                    <div className="flex items-center justify-center space-x-2 my-4">
                        <span className="text-sm text-gray-500">or continue with</span>
                    </div>

                    {/* Social Login */}
                    <div className="flex flex-col gap-3">
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2"
                            onClick={() =>
                                signIn("google", {
                                    callbackUrl: "/",
                                })
                            }
                        >
                            <Image
                                src="https://img.icons8.com/color/24/google-logo.png"
                                alt="Google"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                            Login with Google
                        </Button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
