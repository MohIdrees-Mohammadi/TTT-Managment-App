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
import { Card } from "../ui/card";
import { DollarSign, Users } from "lucide-react";

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

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  commissionRate: number;
  studentCount: number;
  salary: number;
}

interface TeacherDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
  students: Student[];
}

const TeacherDetailDialog: React.FC<TeacherDetailDialogProps> = ({
  isOpen,
  onClose,
  teacher,
  students,
}) => {
  if (!teacher) return null;

  const filteredStudents = students.filter(
    (student) => student.assignedTeacher === teacher.name,
  );

  const totalFees = filteredStudents.reduce((sum, s) => sum + s.fee, 0);
  const totalPaid = filteredStudents.reduce((sum, s) => sum + s.paidAmount, 0);
  const collectionRate = totalFees > 0 ? (totalPaid / totalFees) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {teacher.name} - {teacher.specialization}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Commission Rate</p>
                <p className="text-2xl font-bold">
                  {(teacher.commissionRate * 100).toFixed(0)}%
                </p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p className="text-2xl font-bold">{teacher.studentCount}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-purple-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Salary</p>
                <p className="text-2xl font-bold">
                  ${teacher.salary.toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Income Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card className="p-4">
              <p className="text-sm text-gray-500">Total Student Fees</p>
              <p className="text-xl font-bold">${totalFees.toLocaleString()}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-gray-500">Collection Rate</p>
              <div className="mt-2">
                <Progress value={collectionRate} className="h-2" />
                <div className="flex justify-between mt-1 text-sm">
                  <span>${totalPaid.toLocaleString()}</span>
                  <span>{collectionRate.toFixed(0)}%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            Assigned Students ({filteredStudents.length})
          </h3>
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

export default TeacherDetailDialog;
