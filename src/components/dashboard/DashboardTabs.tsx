import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentRegistrationForm from "../students/StudentRegistrationForm";
import StudentList from "../students/StudentList";
import StudentsByTeacher from "../students/StudentsByTeacher";
import TeacherForm from "../teachers/TeacherForm";
import TeacherView from "../teachers/TeacherView";
import AssignmentInterface from "../assignments/AssignmentInterface";
import SummaryCards from "./SummaryCards";

interface DashboardTabsProps {
  defaultTab?: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  defaultTab = "students",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [showTeacherStudents, setShowTeacherStudents] = useState(false);
  const [selectedTeacherDetails, setSelectedTeacherDetails] = useState<
    any | null
  >(null);
  const [showTeacherDetails, setShowTeacherDetails] = useState(false);

  // Mock data for demonstration
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
  ]);

  // Handlers for adding new data
  const handleStudentRegistration = (values: any) => {
    // Calculate installment amounts
    const totalFee = Number(values.fee);
    const installmentAmount = Math.floor(totalFee / 3);
    const lastInstallment = totalFee - installmentAmount * 2; // Ensure the total is exact

    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    const twoMonthsLater = new Date(today);
    twoMonthsLater.setMonth(today.getMonth() + 2);

    const newStudent = {
      id: (students.length + 1).toString(),
      name: values.name,
      fname: values.fname,
      course: values.course,
      fee: totalFee,
      paidAmount: 0, // Initially no payment
      installments: [
        {
          amount: installmentAmount,
          date: today.toISOString().split("T")[0],
          paid: false,
        },
        {
          amount: installmentAmount,
          date: nextMonth.toISOString().split("T")[0],
          paid: false,
        },
        {
          amount: lastInstallment,
          date: twoMonthsLater.toISOString().split("T")[0],
          paid: false,
        },
      ],
      assignedTeacher: values.teacherId
        ? teachers.find((t) => t.id === values.teacherId)?.name || null
        : null,
      registrationDate: new Date().toISOString().split("T")[0],
    };
    setStudents([...students, newStudent]);
  };

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

  const handleAssignStudent = (studentId: string, teacherId: string) => {
    // Update the student's assigned teacher
    const updatedStudents = students.map((student) => {
      if (student.id === studentId) {
        return { ...student, assignedTeacher: teacherId };
      }
      return student;
    });

    // Update teacher's student count and salary
    const updatedTeachers = teachers.map((teacher) => {
      if (teacher.id === teacherId) {
        const assignedStudents = updatedStudents.filter(
          (s) => s.assignedTeacher === teacherId,
        );
        const totalFees = assignedStudents.reduce((sum, s) => sum + s.fee, 0);
        return {
          ...teacher,
          studentCount: assignedStudents.length,
          salary: Math.round(totalFees * teacher.commissionRate),
        };
      }
      return teacher;
    });

    setStudents(updatedStudents);
    setTeachers(updatedTeachers);
  };

  // Update teacher counts and salaries based on assigned students
  const updateTeacherMetrics = () => {
    const updatedTeachers = teachers.map((teacher) => {
      const assignedStudents = students.filter(
        (s) => s.assignedTeacher === teacher.name,
      );
      const totalFees = assignedStudents.reduce((sum, s) => sum + s.fee, 0);
      return {
        ...teacher,
        studentCount: assignedStudents.length,
        salary: Math.round(totalFees * teacher.commissionRate),
      };
    });
    setTeachers(updatedTeachers);
  };

  // Call updateTeacherMetrics when component mounts
  React.useEffect(() => {
    updateTeacherMetrics();
  }, []);

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="students">Student Management</TabsTrigger>
          <TabsTrigger value="teachers">Teacher Management</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          <div className="grid grid-cols-1 gap-8">
            <StudentRegistrationForm onSubmit={handleStudentRegistration} />
            <StudentList
              students={students}
              onEdit={(student) => console.log("Edit student:", student)}
              onDelete={(id) =>
                setStudents(students.filter((student) => student.id !== id))
              }
              onAssign={handleAssignStudent}
              onViewTeacherStudents={(teacherName) => {
                setSelectedTeacher(teacherName);
                setShowTeacherStudents(true);
              }}
            />

            <StudentsByTeacher
              isOpen={showTeacherStudents}
              onClose={() => setShowTeacherStudents(false)}
              teacherName={selectedTeacher}
              students={students}
            />
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-6">
          <div className="grid grid-cols-1 gap-8">
            <TeacherForm onSubmit={handleTeacherSubmit} />
            <TeacherView />
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-6">
          <SummaryCards
            studentMetrics={{
              totalStudents: students.length,
              newStudentsThisMonth: 5,
              averageFee: Math.round(
                students.reduce((sum, s) => sum + s.fee, 0) / students.length,
              ),
              coursesEnrolled: students.length,
            }}
            teacherMetrics={{
              totalTeachers: teachers.length,
              averageStudentsPerTeacher:
                Math.round((students.length / teachers.length) * 10) / 10,
              topPerformer:
                teachers.sort((a, b) => b.studentCount - a.studentCount)[0]
                  ?.name || "None",
              coursesOffered: 12,
            }}
            financialMetrics={{
              totalRevenue: students.reduce((sum, s) => sum + s.fee, 0),
              monthlyRevenue: Math.round(
                students.reduce((sum, s) => sum + s.fee, 0) / 3,
              ),
              averageTeacherSalary: Math.round(
                teachers.reduce((sum, t) => sum + t.salary, 0) /
                  teachers.length,
              ),
              projectedAnnualRevenue:
                students.reduce((sum, s) => sum + s.fee, 0) * 4,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
