import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BookOpen, Users, DollarSign, Calendar } from "lucide-react";

interface TeacherDashboardProps {
  teacherName?: string;
  specialization?: string;
  commissionRate?: number;
  assignedCourses?: {
    id: string;
    name: string;
    students: number;
    totalFees: number;
  }[];
  totalStudents?: number;
  totalEarnings?: number;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacherName = "Jane Smith",
  specialization = "Mathematics",
  commissionRate = 0.3,
  assignedCourses = [
    { id: "1", name: "Algebra I", students: 12, totalFees: 3600 },
    { id: "2", name: "Calculus", students: 8, totalFees: 2800 },
    { id: "3", name: "Geometry", students: 15, totalFees: 4500 },
  ],
  totalStudents = 35,
  totalEarnings = 3270,
}) => {
  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back, {teacherName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">{totalStudents}</p>
                <p className="text-xs text-gray-500">Across all courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Assigned Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">{assignedCourses.length}</p>
                <p className="text-xs text-gray-500">Active courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  ${totalEarnings.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  Commission rate: {commissionRate * 100}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Specialization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">{specialization}</p>
                <p className="text-xs text-gray-500">Primary teaching area</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Assigned Courses</TabsTrigger>
          <TabsTrigger value="students">Student List</TabsTrigger>
          <TabsTrigger value="earnings">Earnings Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Courses</CardTitle>
              <CardDescription>
                Manage your assigned courses and student enrollments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        Course Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Students
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Total Fees
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        Your Earnings
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedCourses.map((course) => (
                      <tr key={course.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{course.name}</td>
                        <td className="py-3 px-4">{course.students}</td>
                        <td className="py-3 px-4">
                          ${course.totalFees.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          $
                          {(course.totalFees * commissionRate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Students</CardTitle>
              <CardDescription>
                View all students assigned to your courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-8">
                Student list will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
              <CardDescription>
                Detailed view of your earnings by course and period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Monthly Summary</h3>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Total Course Fees:</span>
                      <span>
                        ${(totalEarnings / commissionRate).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Your Commission Rate:</span>
                      <span>{commissionRate * 100}%</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Your Earnings:</span>
                      <span>${totalEarnings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Payment Schedule</h3>
                  <p className="text-gray-500">
                    Payments are processed on the 15th and 30th of each month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;
