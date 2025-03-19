import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

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

interface StudentsByTeacherProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string | null;
  students: Student[];
}

const StudentsByTeacher: React.FC<StudentsByTeacherProps> = ({
  isOpen,
  onClose,
  teacherName,
  students,
}) => {
  if (!teacherName) return null;

  const filteredStudents = students.filter(
    (student) => student.assignedTeacher === teacherName,
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Students Assigned to {teacherName}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {filteredStudents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Father's Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Fee Status</TableHead>
                  <TableHead>Payment Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const paymentPercentage =
                    (student.paidAmount / student.fee) * 100;
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.fname}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>
                        ${student.paidAmount.toFixed(2)} / $
                        {student.fee.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="w-full">
                          <Progress value={paymentPercentage} className="h-2" />
                          <div className="text-xs text-right mt-1">
                            {paymentPercentage.toFixed(0)}%
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No students assigned to this teacher.
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentsByTeacher;
