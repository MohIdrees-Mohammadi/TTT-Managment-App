import React from "react";
import Header from "./layout/Header";
import DashboardTabs from "./dashboard/DashboardTabs";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="text-sm text-gray-500">
              Manage students, teachers, and assignments
            </div>
          </div>

          <DashboardTabs defaultTab="students" />
        </div>
      </main>

      <footer className="bg-white border-t py-4 px-6 mt-auto">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Student-Teacher Management System
          </div>
          <div className="text-sm text-gray-500">Version 1.0.0</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
