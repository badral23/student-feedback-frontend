"use client";

import FeedbackListPage from "@/components/feedback/FeedbackList";
import { useAuth } from "@/contexts/AuthContext";
import { feedbackAPI } from "@/lib/api";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Dashboard() {
  const { user } = useAuth();
  const [statistics, setStatistics] = useState<any>(null);
  const [recentFeedback, setRecentFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For admins and teachers, fetch statistics
        if (user?.role === "admin" || user?.role === "moderator") {
          const statsResponse = await feedbackAPI.getStatistics();
          setStatistics(statsResponse.data);
        }

        // Fetch recent feedback
        const feedbackResponse = await feedbackAPI.getAll({ limit: 5 });
        setRecentFeedback(feedbackResponse.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  // return (
  //   <div className="flex flex-1 flex-col">
  //     <div className="@container/main flex flex-1 flex-col gap-2">
  //       <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
  //         <SectionCards />
  //         <div className="px-4 lg:px-6">{/* <ChartAreaInteractive /> */}</div>
  //         {/* <DataTable data={data} /> */}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        {/* <FeedbackListPage /> */}
        {(user?.role === "admin" || user?.role === "moderator") &&
          statistics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-sm font-medium text-gray-500">
                  Total Feedback
                </h2>
                <p className="text-3xl font-bold">{statistics.totalFeedback}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-sm font-medium text-gray-500">
                  Unresolved Issues
                </h2>
                <p className="text-3xl font-bold">
                  {statistics.unresolvedFeedback}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-sm font-medium text-gray-500">
                  High Priority
                </h2>
                <p className="text-3xl font-bold">
                  {statistics.priorityCounts?.find(
                    (p: any) => p.priority === "high"
                  )?.count || 0}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-sm font-medium text-gray-500">Resolved</h2>
                <p className="text-3xl font-bold">
                  {statistics.statusCounts?.find(
                    (s: any) => s.status === "resolved"
                  )?.count || 0}
                </p>
              </div>
            </div>
          )}

        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium">Recent Feedback</h3>
          </div>

          <ul className="divide-y divide-gray-200">
            {recentFeedback.length > 0 ? (
              recentFeedback.map((feedback) => (
                <li key={feedback.id} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{feedback.title}</h4>
                      <p className="text-sm text-gray-500 truncate">
                        {feedback.description}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          feedback.status === "new"
                            ? "bg-blue-100 text-blue-800"
                            : feedback.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : feedback.status === "resolved"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {feedback.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 text-center text-gray-500">
                No feedback found
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
