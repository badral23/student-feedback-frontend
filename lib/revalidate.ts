"use server";

import { revalidateTag } from "next/cache";

export default async function action(tagName: string) {
  revalidateTag(tagName);
}
