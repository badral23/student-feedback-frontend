import { FeedbackDataTable } from "./FeedbackDataTable";
import StudentFeedbackDialog from "./FeedbackDialog";

export default function FeedbackListPage({ data }: any) {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Feedback Management</h1>

        <StudentFeedbackDialog />
      </div>
      <FeedbackDataTable data={data} />
    </div>
  );
}
