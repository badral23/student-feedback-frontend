import FeedbackListPage from "@/components/feedback/FeedbackList";
import { SectionCards } from "@/components/ui/section-card";
import { getFeedback } from "@/lib/get-feedback";

export default async function Dashboard() {
  const feedback = await getFeedback();

  return (
    <div className="flex flex-1 flex-col">
      <SectionCards />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <FeedbackListPage data={feedback} />
      </div>
    </div>
  );
}
