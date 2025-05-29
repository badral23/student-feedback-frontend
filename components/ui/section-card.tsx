"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export function SectionCards({
  statistics,
}: {
  statistics: {
    total: number;
    new: number;
    rejected: number;
    completed: number;
  };
}) {
  const { data: ss } = useSession();
  const user: any = ss?.user;

  return (
    user &&
    user?.role !== "student" && (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Нийт Хүсэлт</CardTitle>
            <CardDescription>
              <span className="text-foreground font-bold ps-.5">
                {statistics.total}
              </span>{" "}
              in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Badge variant="outline">
              <TrendingUpIcon />
              +12.5%
            </Badge>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Шинэ Хүсэлт</CardTitle>
            <CardDescription>
              <span className="text-foreground font-bold ps-.5">
                {statistics.new}
              </span>{" "}
              new request in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Badge variant="outline">
              <TrendingDownIcon />
              -20%
            </Badge>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Шийдсэн Хүсэлт</CardTitle>
            <CardDescription>
              <span className="text-foreground font-bold ps-.5">
                {statistics.completed}
              </span>{" "}
              users from last month
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Badge variant="outline">
              <TrendingUpIcon />
              +12.5%
            </Badge>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Татгалзсан Хүсэлт</CardTitle>
            <CardDescription>
              <span className="text-foreground font-bold ps-.5">
                {statistics.rejected}
              </span>{" "}
              increase per month
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Badge variant="outline">
              <TrendingUpIcon />
              +4.5%
            </Badge>
          </CardFooter>
        </Card>
      </div>
    )
  );
}
