import React, { useState } from "react";
import Header from "./layout/Header";
import DashboardTabs from "./dashboard/DashboardTabs";
import TeacherDashboard from "./teachers/TeacherDashboard";

const Home: React.FC = () => {
  const [activeView, setActiveView] = useState<"admin" | "teacher">("admin");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeView={activeView} onViewChange={setActiveView} />

      <main className="container mx-auto py-8 px-4">
        {activeView === "admin" ? (
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
        ) : (
          <TeacherDashboard
            teacherName="Jane Smith"
            specialization="Mathematics"
            commissionRate={0.3}
            assignedCourses={[
              { id: "1", name: "Algebra I", students: 12, totalFees: 3600 },
              { id: "2", name: "Calculus", students: 8, totalFees: 2800 },
              { id: "3", name: "Geometry", students: 15, totalFees: 4500 },
            ]}
            totalStudents={35}
            totalEarnings={3270}
          />
        )}
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
