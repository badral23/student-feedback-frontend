"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sfFetch } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await sfFetch("/auth/register", {
        method: "POST",
        body: {
          username: data.username,
          email: data.email,
          password: data.password,
          studentId: data.studentId,
        },
      });

      if (res.body) {
        toast.success("Registration successful! Please log in.");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register for Student Feedback System
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
                placeholder="John Due"
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                {...register("studentId", {
                  required: "Student ID is required",
                })}
                placeholder="12345678"
              />
              {errors.studentId && (
                <p className="text-sm text-red-500">
                  {errors.studentId.message as string}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
