import Topbar from "../components/layout/Topbar";
import MetricCards from "../components/dashboard/MetricCards";
import TrendChart from "../components/dashboard/TrendChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { useFinance } from "../hooks/useFinance";

export default function Dashboard() {
const { transactions } = useFinance();

const income = transactions
.filter((t) => t.type === "income")
.reduce((acc, t) => acc + t.amount, 0);

const expense = transactions
.filter((t) => t.type === "expense")
.reduce((acc, t) => acc + t.amount, 0);

const balance = income - expense;

return (
<div className="p-6 max-w-7xl mx-auto space-y-6">

{/* TOPBAR */}  
  <Topbar />  

  {/* METRICS */}  
  <MetricCards  
    balance={balance}  
    income={income}  
    expense={expense}  
    count={transactions.length}  
  />  

  {/* CHART SECTION */}  
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">  

    {/* BIG CHART */}  
    <div className="lg:col-span-2">  
      <TrendChart transactions={transactions} />  
    </div>  

    {/* DONUT */}  
    <div className="h-full">  
      <CategoryChart transactions={transactions} />  
    </div>  

  </div>  

  {/* RECENT */}  
  <RecentTransactions />  

</div>

);
}