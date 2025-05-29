import { ChartAreaInteractive } from "@/components/feedback/DemoChart";
import { SectionCards } from "@/components/ui/section-card";
import { getStatistics } from "@/lib/get-api";

export default async function Dashboard() {
  const statistics = await getStatistics();

  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Хяналтын самбар</h1>
      </div>
      <SectionCards statistics={statistics} />
      <div className="pt-6">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
