import { FeedbackDataTable } from "./FeedbackDataTable";
import StudentFeedbackDialog from "./FeedbackDialog";

export default function FeedbackListPage({ data }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Санал хүсэлтийг удирдах</h1>
        <StudentFeedbackDialog />
      </div>
      <FeedbackDataTable data={data} />
    </div>
  );
}
