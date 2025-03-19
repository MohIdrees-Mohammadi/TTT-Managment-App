import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash2, UserPlus, DollarSign, Eye } from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  commissionRate: number;
  studentCount: number;
  salary: number;
}

interface TeacherListProps {
  teachers?: Teacher[];
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (teacherId: string) => void;
  onViewSalary?: (teacher: Teacher) => void;
  onViewDetails?: (teacher: Teacher) => void;
}

const TeacherList = ({
  teachers = [
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
  ],
  onEdit = () => {},
  onDelete = () => {},
  onViewSalary = () => {},
  onViewDetails = () => {},
}: TeacherListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Management</h2>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search teachers..."
              className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            className="flex items-center gap-2"
            onClick={() =>
              document
                .getElementById("teacher-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <UserPlus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Commission Rate</TableHead>
              <TableHead>Student Count</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher) => (
                <TableRow
                  key={teacher.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => onViewDetails(teacher)}
                >
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.specialization}</TableCell>
                  <TableCell>
                    {(teacher.commissionRate * 100).toFixed(0)}%
                  </TableCell>
                  <TableCell>{teacher.studentCount}</TableCell>
                  <TableCell>${teacher.salary.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(teacher);
                        }}
                        title="View Teacher Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewSalary(teacher);
                        }}
                        title="View Salary Details"
                      >
                        <DollarSign className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(teacher);
                        }}
                        title="Edit Teacher"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(teacher.id);
                        }}
                        title="Delete Teacher"
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
                  {searchTerm
                    ? "No teachers found matching your search"
                    : "No teachers added yet"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeacherList;
