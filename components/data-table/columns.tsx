"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { DataTableColumnHeader } from "./data-table-column-header"

// Define the feedback item type based on the provided data structure
export interface Feedback {
  id: string
  title: string
  description: string
  userId: string
  status: string
  createdAt: string
  updatedAt: string
  resolvedAt: string | null
  assignedToId: string | null
  user?: {
    id: string
    username: string
    email: string
    role: string
  }
}

export const columns: ColumnDef<Feedback>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <Link href={`/feedback/${row.original.id}`} className="hover:underline">
            {row.getValue("title")}
          </Link>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
    cell: ({ row }) => {
      return <div className="max-w-[500px] truncate">{row.getValue("description")}</div>
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> =
        {
          new: { label: "New", variant: "default" },
          "in-progress": { label: "In Progress", variant: "secondary" },
          resolved: { label: "Resolved", variant: "outline" },
          closed: { label: "Closed", variant: "destructive" },
        }

      const { label, variant } = statusMap[status] || { label: status, variant: "outline" }

      return <Badge variant={variant}>{label}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "user.username",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Submitted By" />,
    cell: ({ row }) => {
      const user = row.original.user
      return <div>{user?.username || "Unknown"}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("createdAt"))}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const feedback = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(feedback.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/feedback/${feedback.id}`} className="flex w-full">
                View details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/feedback/${feedback.id}/edit`} className="flex w-full">
                Edit
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
