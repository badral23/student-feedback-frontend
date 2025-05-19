import React from "react";
import dayjs from "dayjs";
import FeedbackReplyForm from "@/components/feedback/FeedbackReply";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getFeedbackDetail } from "@/lib/get-feedback";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import ChangeStatusDialog from "@/components/feedback/ChangeStatus";

export default async function Feedback({ params }: any) {
  const { slug } = await params;
  const data = await getFeedbackDetail({ slug });
  const body: any = data;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            New
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        );
      case "to-be-submitted-to-branch-meeting":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Branch Meeting
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Rejected
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            Completed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            {status}
          </Badge>
        );
    }
  };

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

        <div className="space-y-4 flex justify-between">
          <p>{getStatusBadge(body.status)}</p>

          <ChangeStatusDialog currentStatus={body.status} slug={slug} />
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
                  {comment.user?.username}
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
