"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { authAPI } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      await authAPI.register({
        username: data.username,
        email: data.email,
        password: data.password,
        role: "student", // Default role for registration
        department: data.department,
        studentId: data.studentId,
      });

      toast.success("Registration successful! Please log in.");
      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Register for Student Feedback System
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* New fields: Department and Student ID */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              id="department"
              type="text"
              {...register("department", {
                required: "Department is required",
              })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">
                {errors.department.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700"
            >
              Student ID
            </label>
            <input
              id="studentId"
              type="text"
              {...register("studentId", { required: "Student ID is required" })}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.studentId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.studentId.message as string}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
