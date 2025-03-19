import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search, Edit, Trash2, UserCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Student {
  id: string;
  name: string;
  fname: string;
  course: string;
  fee: number;
  paidAmount: number;
  installments: {
    amount: number;
    date: string;
    paid: boolean;
  }[];
  assignedTeacher: string | null;
  registrationDate: string;
}

interface StudentListProps {
  students?: Student[];
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
  onAssign?: (studentId: string, teacherId: string) => void;
  onViewTeacherStudents?: (teacherName: string | null) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students = [
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
      assignedTeacher: "Ms. Johnson",
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
      assignedTeacher: "Mr. Wilson",
      registrationDate: "2023-04-20",
    },
    {
      id: "4",
      name: "Emily",
      fname: "Davis",
      course: "Biology",
      fee: 1250,
      paidAmount: 0,
      installments: [
        { amount: 417, date: "2023-06-15", paid: false },
        { amount: 417, date: "2023-07-15", paid: false },
        { amount: 416, date: "2023-08-15", paid: false },
      ],
      assignedTeacher: null,
      registrationDate: "2023-06-10",
    },
    {
      id: "5",
      name: "Robert",
      fname: "Wilson",
      course: "Computer Science",
      fee: 1800,
      paidAmount: 600,
      installments: [
        { amount: 600, date: "2023-05-30", paid: true },
        { amount: 600, date: "2023-06-30", paid: false },
        { amount: 600, date: "2023-07-30", paid: false },
      ],
      assignedTeacher: "Dr. Roberts",
      registrationDate: "2023-05-28",
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onAssign = () => {},
  onViewTeacherStudents = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  // Mock teachers data
  const teachers = [
    { id: "1", name: "Ms. Johnson" },
    { id: "2", name: "Mr. Wilson" },
    { id: "3", name: "Dr. Roberts" },
    { id: "4", name: "Mrs. Thompson" },
    { id: "5", name: "Prof. Anderson" },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAssignTeacher = () => {
    if (selectedStudent && selectedTeacher) {
      onAssign(selectedStudent.id, selectedTeacher);
      setSelectedStudent(null);
      setSelectedTeacher("");
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Student List</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search students by name or course..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>List of all registered students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Father's Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Total Fee</TableHead>
              <TableHead>Paid Amount</TableHead>
              <TableHead>Assigned Teacher</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.fname}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>${student.fee.toFixed(2)}</TableCell>
                  <TableCell>${student.paidAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    {student.assignedTeacher ? (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                        onClick={() =>
                          onViewTeacherStudents(student.assignedTeacher)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {student.assignedTeacher}
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200"
                      >
                        Not Assigned
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{student.registrationDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedStudent(student)}
                            disabled={!!student.assignedTeacher}
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Teacher to Student</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="mb-4">
                              Assign a teacher to{" "}
                              <strong>{selectedStudent?.name}</strong>
                            </p>
                            <Select
                              value={selectedTeacher}
                              onValueChange={setSelectedTeacher}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a teacher" />
                              </SelectTrigger>
                              <SelectContent>
                                {teachers.map((teacher) => (
                                  <SelectItem
                                    key={teacher.id}
                                    value={teacher.id}
                                  >
                                    {teacher.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="mt-6 flex justify-end space-x-2">
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  onClick={handleAssignTeacher}
                                  disabled={!selectedTeacher}
                                >
                                  Assign
                                </Button>
                              </DialogClose>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => onDelete(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  No students found. Try adjusting your search or add new
                  students.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentList;
