// app/(your-path)/feedback/[slug]/reply-form.tsx

"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sfFetch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import action from "@/lib/revalidate";

export default function FeedbackReplyForm({ slug }: { slug: string }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const handleSend = async () => {
    if (!message.trim()) return;

    console.log("message", message);
    console.log("slug", slug);

    setIsSending(true);
    try {
      const res = await sfFetch(`/comments`, {
        method: "POST",
        body: { content: message, feedbackId: slug, isInternal: false },
      });

      console.log("res", res);
      action("feedback_detail");
      toast.success("Comment posted");
      setMessage("");
      router.refresh(); // refresh server component
    } catch (err) {
      toast.error("Failed to send comment");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-base font-medium">Add a reply</h4>
      <Textarea
        placeholder="Write your comment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSend} disabled={isSending || !message.trim()}>
        {isSending ? "Sending..." : "Post Comment"}
      </Button>
    </div>
  );
}
