import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {/* Responsive Sidebar */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* Main Content Area */}
        <div
          className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
            collapsed ? "md:ml-20" : "md:ml-64"
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
            <Topbar setIsOpen={setIsOpen} />

            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/insights" element={<Insights />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}