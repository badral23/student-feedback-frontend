/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, signOut } from "@/auth";

const domain = process.env.NEXT_PUBLIC_API_URL;

if (!domain) {
  throw new Error("NEXT_PUBLIC_API_URL is not set or invalid");
}

type FetchResult<T> = {
  body: T;
  error: string | null;
};

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, unknown>;
  searchParams?: Record<string, string | number | boolean | undefined | null>;
  tags?: string[];
};

export async function sfFetch<
  T extends object &
    Partial<{
      error?: string;
      success?: boolean;
      message?: string;
      data?: any;
      status?: number;
    }>
>(url: string, options: FetchOptions = {}): Promise<FetchResult<T>> {
  try {
    const session = await auth();
    const headers = new Headers(options.headers);

    if (!!session?.user?.id && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${session.user.id}`);
    }

    const { endpoint, fetchOptions } = genFetchParams(url, {
      cache: "force-cache",
      ...options,
      headers,
      tags: options.tags,
    });

    const response = await fetch(endpoint, fetchOptions);
    const body: T = await response.json();

    if (response.status === 401) {
      signOut();
    }

    if (!response.ok) {
      throw new Error(
        body?.error || (body as any)?.message || String(response.status)
      );
    }

    return {
      body,
      error: null,
    };
  } catch (err: any) {
    return {
      body: {} as T,
      error: err?.message || "Unknown error",
    };
  }
}

function genFetchParams(url: string, options: FetchOptions = {}) {
  const isBodyJSON = options.body && typeof options.body === "object";
  const headers = new Headers(options.headers);

  if (isBodyJSON && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const fetchOptions: any = {
    ...options,
    headers,
    credentials: "include",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if (isBodyJSON) {
    fetchOptions.body = JSON.stringify(clearObj(options.body));
  }

  let endpoint = `${domain}${url}`;
  if (options.searchParams && Object.keys(options.searchParams).length > 0) {
    const query = objToQs(clearObj(options.searchParams));
    endpoint += `?${query}`;
  }

  return { endpoint, fetchOptions };
}

// Utility: Remove undefined/null values
function clearObj(obj?: Record<string, any>) {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
  );
}

// Utility: Convert object to query string
function objToQs(obj: Record<string, any>): string {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");
}
