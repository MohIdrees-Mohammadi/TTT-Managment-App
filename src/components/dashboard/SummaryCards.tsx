import React from "react";
import MetricCard from "./MetricCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Users, GraduationCap, DollarSign, BookOpen } from "lucide-react";

interface SummaryCardsProps {
  studentMetrics?: {
    totalStudents: number;
    newStudentsThisMonth: number;
    averageFee: number;
    coursesEnrolled: number;
  };
  teacherMetrics?: {
    totalTeachers: number;
    averageStudentsPerTeacher: number;
    topPerformer: string;
    coursesOffered: number;
  };
  financialMetrics?: {
    totalRevenue: number;
    monthlyRevenue: number;
    averageTeacherSalary: number;
    projectedAnnualRevenue: number;
  };
}

const SummaryCards = ({
  studentMetrics = {
    totalStudents: 124,
    newStudentsThisMonth: 18,
    averageFee: 750,
    coursesEnrolled: 210,
  },
  teacherMetrics = {
    totalTeachers: 15,
    averageStudentsPerTeacher: 8.3,
    topPerformer: "Sarah Johnson",
    coursesOffered: 24,
  },
  financialMetrics = {
    totalRevenue: 93000,
    monthlyRevenue: 12500,
    averageTeacherSalary: 4200,
    projectedAnnualRevenue: 150000,
  },
}: SummaryCardsProps) => {
  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Dashboard Summary</h2>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Students"
              value={studentMetrics.totalStudents}
              description="Total number of registered students"
              icon={<Users className="h-5 w-5" />}
              trend="up"
              trendValue="+5% from last month"
            />
            <MetricCard
              title="New Students"
              value={studentMetrics.newStudentsThisMonth}
              description="New students registered this month"
              icon={<Users className="h-5 w-5" />}
              trend="up"
              trendValue="+12% from last month"
            />
            <MetricCard
              title="Average Fee"
              value={`$${studentMetrics.averageFee}`}
              description="Average course fee per student"
              icon={<DollarSign className="h-5 w-5" />}
              trend="neutral"
            />
            <MetricCard
              title="Courses Enrolled"
              value={studentMetrics.coursesEnrolled}
              description="Total course enrollments"
              icon={<BookOpen className="h-5 w-5" />}
              trend="up"
              trendValue="+8% from last month"
            />
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Teachers"
              value={teacherMetrics.totalTeachers}
              description="Total number of active teachers"
              icon={<GraduationCap className="h-5 w-5" />}
              trend="up"
              trendValue="+2 from last month"
            />
            <MetricCard
              title="Avg Students/Teacher"
              value={teacherMetrics.averageStudentsPerTeacher}
              description="Average number of students per teacher"
              icon={<Users className="h-5 w-5" />}
              trend="up"
              trendValue="+0.8 from last month"
            />
            <MetricCard
              title="Top Performer"
              value={teacherMetrics.topPerformer}
              description="Teacher with highest student count"
              icon={<GraduationCap className="h-5 w-5" />}
              trend="neutral"
            />
            <MetricCard
              title="Courses Offered"
              value={teacherMetrics.coursesOffered}
              description="Total number of courses available"
              icon={<BookOpen className="h-5 w-5" />}
              trend="up"
              trendValue="+3 from last month"
            />
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Revenue"
              value={`$${financialMetrics.totalRevenue}`}
              description="Total revenue generated to date"
              icon={<DollarSign className="h-5 w-5" />}
              trend="up"
              trendValue="+15% from last quarter"
            />
            <MetricCard
              title="Monthly Revenue"
              value={`$${financialMetrics.monthlyRevenue}`}
              description="Revenue generated this month"
              icon={<DollarSign className="h-5 w-5" />}
              trend="up"
              trendValue="+8% from last month"
            />
            <MetricCard
              title="Avg Teacher Salary"
              value={`$${financialMetrics.averageTeacherSalary}`}
              description="Average monthly teacher earnings"
              icon={<DollarSign className="h-5 w-5" />}
              trend="up"
              trendValue="+5% from last month"
            />
            <MetricCard
              title="Projected Annual"
              value={`$${financialMetrics.projectedAnnualRevenue}`}
              description="Projected annual revenue"
              icon={<DollarSign className="h-5 w-5" />}
              trend="up"
              trendValue="+12% from last year"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SummaryCards;
