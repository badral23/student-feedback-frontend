"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import EditFeedbackDialog from "./FeedbackEdit";
import DeleteFeedbackDialog from "./FeedbackDelete";
import { useSession } from "next-auth/react";
import { DataTableFacetedFilter } from "./FeedbackFaceted";

// Define the feedback item type based on the provided data structure
export interface Feedback {
  id: string;
  title: string;
  description: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  assignedToId: string | null;
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface FeedbackDataTableProps {
  data: Feedback[];
}

export function FeedbackDataTable({ data }: FeedbackDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Feedback>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium px-3">{row.getValue("title")}</div>
      ),
    },

    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableColumnFilter: true,

      cell: ({ row }) => {
        const status = row.getValue("status") as string;

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

        return getStatusBadge(status);
      },
    },

    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="p-3">{formatDate(row.getValue("createdAt"))}</div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        let feedback = row.original;

        return (
          <div className="flex gap-2 items-end">
            <EditFeedbackDialog feedbackId={feedback.id} data={data} />
            <DeleteFeedbackDialog feedbackId={feedback.id} />
            <Link href={`/feedback/${feedback.id}`}>
              <Button variant="ghost" className="cursor-pointer">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const ModeratorColumns: ColumnDef<Feedback>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium px-3">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-[300px] truncate">
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

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

        return getStatusBadge(status);
      },
    },
    {
      accessorKey: "user.username",
      header: "Submitted By",
      cell: ({ row }) => {
        const user = row.original.user;
        return <div>{user?.username || "Unknown"}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="whitespace-nowrap"
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="p-3">{formatDate(row.getValue("createdAt"))}</div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        let feedback = row.original;

        return (
          <div className="flex gap-2 items-end">
            <Link href={`/feedback/${feedback.id}`}>
              <Button variant="ghost" className="cursor-pointer">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const { data: ss } = useSession();

  const user: any = ss?.user;

  const table = useReactTable({
    data,
    columns:
      user?.role === "moderator" || user?.role === "admin"
        ? ModeratorColumns
        : columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Санал хүсэлт</CardTitle>
        <CardDescription>Оюутны санал хүсэлтийг хянах</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <Input
            placeholder="Гарчгаар шүүх..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={[
                {
                  value: "new",
                  label: "New",
                },
                {
                  value: "approved",
                  label: "Approved",
                },
                {
                  value: "to-be-submitted-to-branch-meeting",
                  label: "Branch Meeting",
                },
                {
                  value: "rejected",
                  label: "Rejected",
                },
                {
                  value: "completed",
                  label: "Completed",
                },
              ]}
            />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="[&:has([role=checkbox])]:pl-3"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 pt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Өмнөх
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Дараах
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
