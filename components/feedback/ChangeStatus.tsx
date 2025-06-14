"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sfFetch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const STATUS_OPTIONS = [
  { value: "approved", label: "Хүлээн авсан" },
  {
    value: "to-be-submitted-to-branch-meeting",
    label: "Салбарын хурлаар оруулах",
  },
  { value: "rejected", label: "Татгалзсан" },
  { value: "completed", label: "Дууссан" },
];

export default function ChangeStatusDialog({
  currentStatus,
  slug,
}: {
  currentStatus: string;
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data: ss } = useSession();
  const user: any = ss?.user;

  const handleChange = async () => {
    setLoading(true);
    try {
      const res = await sfFetch(`/feedback/${slug}`, {
        method: "PATCH",
        body: { status: selectedStatus },
      });
      if (res.body) {
        toast.success("Status updated");
        router.refresh();
        setOpen(false);
      }
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    user &&
    user?.role !== "student" && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Change Status</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Feedback Status</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label>Status</Label>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem
                    key={status.value}
                    value={status.value}
                    className="w-full"
                  >
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleChange} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  );
}
