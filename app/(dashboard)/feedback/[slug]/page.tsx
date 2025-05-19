import { sfFetch } from "@/lib/api";
import React from "react";
import dayjs from "dayjs";
import FeedbackReplyForm from "@/components/feedback/FeedbackReply";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getFeedbackDetail } from "@/lib/get-feedback";
import { cn } from "@/lib/utils";

export default async function Feedback({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const data = await getFeedbackDetail({ slug });

  const body: any = data;

  return (
    <div>
      <div className="ms-6">
        <Link href={"/"}>
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
        </Link>
      </div>
      <div className="max-w-2xl mx-auto space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold border-b pb-4">Feedback Detail</h1>
          <h2 className="text-2xl font-bold">{body.title}</h2>
          <p className="text-gray-600">{body.description}</p>
          <p className="text-sm text-gray-400">
            Created: {dayjs(body.createdAt).format("MMM D, YYYY h:mm A")}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Comments</h3>
          {body?.comments?.length > 0 ? (
            body.comments.map((comment: any) => (
              <div
                key={comment.id}
                className="flex gap-2 w-full border rounded-md bg-gray-50 items-center"
              >
                <div className="p-3 w-full  text-sm">
                  <p>{comment.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {dayjs(comment.createdAt).format("MMM D, h:mm A")}
                  </p>
                </div>
                <p
                  className={cn(
                    "text-xs mt-1 w-1/4 justify-end flex pe-2",
                    body.user?.id === comment.user?.id
                      ? "text-gray-400"
                      : "text-zinc-600"
                  )}
                >
                  {body.user?.id === comment.user?.id
                    ? "You"
                    : comment.user?.username}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
        </div>

        <FeedbackReplyForm slug={slug} />
      </div>
    </div>
  );
}
