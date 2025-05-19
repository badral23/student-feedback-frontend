import { sfFetch } from "@/lib/api";
import React from "react";

export default async function Feedback({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await sfFetch(`/feedback/${slug}`);
  const body: any = data.body;
  return (
    <div>
      <div>name : {body.title}</div>
      <div>description : {body.description}</div>
      <div>created at : {body.createdAt}</div>
      <div>
        {body?.comments?.map((comment: any) => (
          <div>content:{comment.content}</div>
        ))}
      </div>
    </div>
  );
}
