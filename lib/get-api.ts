import { auth } from "@/auth";
// import { revalidateTag } from "next/cache";

interface Feedback {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export async function getFeedback(): Promise<Feedback[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: No user session found.");
  }

  const response = await fetch(`${baseUrl}/feedback`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
    next: { tags: ["feedback"] },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch feedback: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.data as Feedback[];
}

export async function getUsers(): Promise<any[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: No user session found.");
  }

  const response = await fetch(`${baseUrl}/users`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
    next: { tags: ["users"] },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch users: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}

export async function getStatistics(): Promise<{
  total: number;
  new: number;
  rejected: number;
  completed: number;
}> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: No user session found.");
  }

  const response = await fetch(`${baseUrl}/feedback/statistics/summary`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
    next: { tags: ["sum"] },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch statistics: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}

export async function getFeedbackDetail({
  slug,
}: {
  slug: string;
}): Promise<Feedback[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized: No user session found.");
  }

  const response = await fetch(`${baseUrl}/feedback/${slug}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
    next: { tags: ["feedback_detail"] },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch feedback: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  return data as Feedback[];
}
