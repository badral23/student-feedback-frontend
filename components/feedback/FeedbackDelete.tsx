"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { sfFetch } from "@/lib/api";
import action from "@/lib/revalidate";

export default function DeleteFeedbackDialog({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await sfFetch(`/feedback/${feedbackId}`, {
        method: "DELETE",
      });
      action("feedback");

      if (response?.body) {
        toast.success("Feedback deleted");
        setOpen(false);
      } else {
        toast.error("Failed to delete feedback");
      }
    } catch (err) {
      toast.error("Failed to delete feedback");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="w-4 h-4 mr-1" />
          {/* Delete */}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Санал хүсэлтийг устгах</DialogTitle>
        </DialogHeader>
        <p>Та үүнийг устгахдаа илтгэлтэй байна уу?</p>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
