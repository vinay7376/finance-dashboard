import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

export default function App() {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white dark:bg-[#020617] text-black dark:text-white transition-colors duration-300">

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 p-4 md:ml-64">
          <Topbar setIsOpen={setIsOpen} /> {/* ✅ FIXED */}
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}