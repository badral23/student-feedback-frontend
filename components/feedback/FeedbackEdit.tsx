"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sfFetch } from "@/lib/api";
import action from "@/lib/revalidate";
import { Pencil } from "lucide-react";

export default function EditFeedbackDialog({ feedback }: { feedback: any }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(feedback.title);
  const [description, setDescription] = useState(feedback.description);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await sfFetch(`/feedback/${feedback.id}`, {
        method: "PATCH",
        body: { title, description },
      });
      action("feedback");

      if (response?.body) {
        toast.success("Feedback updated");
        setOpen(false);
      } else {
        toast.error("Failed to update feedback");
      }
    } catch (err) {
      toast.error("Failed to update feedback");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4 mr-1" />
          {/* Edit */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Санал хүсэлтийг засварлах</DialogTitle>
            <DialogDescription>
              Санал хүсэлтийнхээ гарчиг, тайлбарыг өөрчлөх.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Гарчиг</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Тайлбар</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Цуцлах
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Ачааллаж байна..." : "Шинэчлэх"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
