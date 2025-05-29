import FeedbackListPage from "@/components/feedback/FeedbackList";
import { getFeedback } from "@/lib/get-api";

export default async function Feedback() {
  const feedback = await getFeedback();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <FeedbackListPage data={feedback} />
    </div>
  );
}
