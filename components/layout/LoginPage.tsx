"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login } from "@/app/(auth)/action";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email, password }: any) => {
    setIsLoading(true);
    try {
      const { status } = await login(email, password);
      if (status === "success") {
        toast.success("Login successful!");
        router.push("/");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-2 md:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Student Feedback System
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", {
                    required: "email is required",
                  })}
                  type="email"
                  id="email"
                  placeholder="Asd@example.com"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message as string}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="password"
                  type="password"
                  required
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message as string}
                  </p>
                )}
              </div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="register" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/conny.jpg"
              width={512}
              height={512}
              alt="image"
              className="object-cover h-full rounded-md grayscale "
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
