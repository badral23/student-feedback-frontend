import { DemoChart } from "@/components/feedback/DemoChart";
import FeedbackListPage from "@/components/feedback/FeedbackList";
import { SectionCards } from "@/components/ui/section-card";
import { getFeedback, getStatistics } from "@/lib/get-feedback";

export default async function Dashboard() {
  const feedback = await getFeedback();
  const statistics = await getStatistics();

  return (
    <div className="flex flex-1 flex-col">
      <SectionCards statistics={statistics} />
      <DemoChart />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <FeedbackListPage data={feedback} />
      </div>
    </div>
  );
}
