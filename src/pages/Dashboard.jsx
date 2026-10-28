import MetricCards from "../components/dashboard/MetricCards";
import TrendChart from "../components/dashboard/TrendChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Metric Cards Row */}
      <MetricCards />

      {/* 2. Charts Row: Line Trend (2/3) + Donut (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 min-h-[380px]">
          <TrendChart />
        </div>
        <div className="min-h-[380px]">
          <CategoryChart />
        </div>
      </div>

      {/* 3. Recent Activity Row */}
      <RecentTransactions />
    </div>
  );
}