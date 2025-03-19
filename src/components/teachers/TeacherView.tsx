import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherList from "./TeacherList";
import TeacherDetailDialog from "./TeacherDetailDialog";
import TeacherDashboard from "./TeacherDashboard";

interface TeacherViewProps {
  defaultTab?: string;
}

const TeacherView: React.FC<TeacherViewProps> = ({ defaultTab = "list" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedTeacherDetails, setSelectedTeacherDetails] = useState<
    any | null
  >(null);
  const [showTeacherDetails, setShowTeacherDetails] = useState(false);

  // Mock data for demonstration
  const [teachers, setTeachers] = useState([
    {
      id: "1",
      name: "John Smith",
      specialization: "Mathematics",
      commissionRate: 0.3,
      studentCount: 12,
      salary: 3600,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      specialization: "Science",
      commissionRate: 0.25,
      studentCount: 8,
      salary: 2000,
    },
    {
      id: "3",
      name: "Michael Brown",
      specialization: "English Literature",
      commissionRate: 0.28,
      studentCount: 15,
      salary: 4200,
    },
    {
      id: "4",
      name: "Emily Davis",
      specialization: "Computer Science",
      commissionRate: 0.35,
      studentCount: 10,
      salary: 3500,
    },
  ]);

  // Mock students data
  const [students, setStudents] = useState([
    {
      id: "1",
      name: "John",
      fname: "Doe",
      course: "Mathematics",
      fee: 1200,
      paidAmount: 400,
      installments: [
        { amount: 400, date: "2023-05-20", paid: true },
        { amount: 400, date: "2023-06-20", paid: false },
        { amount: 400, date: "2023-07-20", paid: false },
      ],
      assignedTeacher: "John Smith",
      registrationDate: "2023-05-15",
    },
    {
      id: "2",
      name: "Jane",
      fname: "Smith",
      course: "Physics",
      fee: 1500,
      paidAmount: 500,
      installments: [
        { amount: 500, date: "2023-06-05", paid: true },
        { amount: 500, date: "2023-07-05", paid: false },
        { amount: 500, date: "2023-08-05", paid: false },
      ],
      assignedTeacher: null,
      registrationDate: "2023-06-02",
    },
    {
      id: "3",
      name: "Michael",
      fname: "Brown",
      course: "Chemistry",
      fee: 1350,
      paidAmount: 450,
      installments: [
        { amount: 450, date: "2023-04-25", paid: true },
        { amount: 450, date: "2023-05-25", paid: false },
        { amount: 450, date: "2023-06-25", paid: false },
      ],
      assignedTeacher: "Sarah Johnson",
      registrationDate: "2023-04-20",
    },
    {
      id: "4",
      name: "Emily",
      fname: "Wilson",
      course: "Mathematics",
      fee: 1200,
      paidAmount: 800,
      installments: [
        { amount: 400, date: "2023-03-15", paid: true },
        { amount: 400, date: "2023-04-15", paid: true },
        { amount: 400, date: "2023-05-15", paid: false },
      ],
      assignedTeacher: "John Smith",
      registrationDate: "2023-03-10",
    },
  ]);

  const handleTeacherSubmit = (values: any) => {
    const newTeacher = {
      id: (teachers.length + 1).toString(),
      name: values.name,
      specialization: values.specialization,
      commissionRate: Number(values.commissionRate) / 100,
      studentCount: 0,
      salary: 0,
    };
    setTeachers([...teachers, newTeacher]);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="list">Teacher List</TabsTrigger>
          <TabsTrigger value="dashboard">Teacher Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="grid grid-cols-1 gap-8">
            <TeacherList
              teachers={teachers}
              onEdit={(teacher) => console.log("Edit teacher:", teacher)}
              onDelete={(id) => {
                setTeachers(teachers.filter((teacher) => teacher.id !== id));
                // Close the detail dialog if the deleted teacher was selected
                if (
                  selectedTeacherDetails &&
                  selectedTeacherDetails.id === id
                ) {
                  setShowTeacherDetails(false);
                  setSelectedTeacherDetails(null);
                }
              }}
              onViewSalary={(teacher) =>
                console.log("View salary details:", teacher)
              }
              onViewDetails={(teacher) => {
                setSelectedTeacherDetails(teacher);
                setShowTeacherDetails(true);
              }}
            />

            <TeacherDetailDialog
              isOpen={showTeacherDetails}
              onClose={() => setShowTeacherDetails(false)}
              teacher={selectedTeacherDetails}
              students={students}
            />
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          {selectedTeacherDetails ? (
            <TeacherDashboard
              teacherName={selectedTeacherDetails.name}
              specialization={selectedTeacherDetails.specialization}
              commissionRate={selectedTeacherDetails.commissionRate}
              totalStudents={selectedTeacherDetails.studentCount}
              totalEarnings={selectedTeacherDetails.salary}
              assignedCourses={[
                { id: "1", name: "Algebra I", students: 5, totalFees: 1500 },
                { id: "2", name: "Calculus", students: 4, totalFees: 1200 },
                { id: "3", name: "Geometry", students: 3, totalFees: 900 },
              ]}
            />
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>Select a teacher from the list to view their dashboard</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherView;
