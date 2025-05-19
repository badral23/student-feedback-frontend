"use server";

import { signIn } from "@/auth";

export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export const login = async (
  email: string,
  password: string
): Promise<LoginActionState> => {
  try {
    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    return { status: "failed" };
  }
};

export interface RegisterActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
}
