import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Edit, Trash2, UserPlus, DollarSign, Eye, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [commissionFilter, setCommissionFilter] = useState("all");
  const [studentCountFilter, setStudentCountFilter] = useState("all");

  // Get unique specializations for filter dropdown
  const specializations = useMemo(() => {
    const uniqueSpecs = new Set(
      teachers.map((teacher) => teacher.specialization),
    );
    return Array.from(uniqueSpecs);
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      // Search term filter (name or specialization)
      const matchesSearch =
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());

      // Specialization filter
      const matchesSpecialization =
        specializationFilter === "all" ||
        teacher.specialization === specializationFilter;

      // Commission rate filter
      const matchesCommission = () => {
        if (commissionFilter === "all") return true;
        const rate = teacher.commissionRate * 100;
        switch (commissionFilter) {
          case "low":
            return rate < 25;
          case "medium":
            return rate >= 25 && rate < 30;
          case "high":
            return rate >= 30;
          default:
            return true;
        }
      };

      // Student count filter
      const matchesStudentCount = () => {
        if (studentCountFilter === "all") return true;
        switch (studentCountFilter) {
          case "low":
            return teacher.studentCount < 10;
          case "medium":
            return teacher.studentCount >= 10 && teacher.studentCount < 15;
          case "high":
            return teacher.studentCount >= 15;
          default:
            return true;
        }
      };

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesCommission() &&
        matchesStudentCount()
      );
    });
  }, [
    teachers,
    searchTerm,
    specializationFilter,
    commissionFilter,
    studentCountFilter,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSpecializationFilter("all");
    setCommissionFilter("all");
    setStudentCountFilter("all");
  };

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

      {/* Filter section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </h3>
          {(specializationFilter !== "all" ||
            commissionFilter !== "all" ||
            studentCountFilter !== "all") && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Specialization filter */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Specialization
            </label>
            <Select
              value={specializationFilter}
              onValueChange={setSpecializationFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Commission rate filter */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Commission Rate
            </label>
            <Select
              value={commissionFilter}
              onValueChange={setCommissionFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Rate</SelectItem>
                <SelectItem value="low">Low (&lt; 25%)</SelectItem>
                <SelectItem value="medium">Medium (25-29%)</SelectItem>
                <SelectItem value="high">High (30%+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student count filter */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Student Count
            </label>
            <Select
              value={studentCountFilter}
              onValueChange={setStudentCountFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Count</SelectItem>
                <SelectItem value="low">Low (&lt; 10)</SelectItem>
                <SelectItem value="medium">Medium (10-14)</SelectItem>
                <SelectItem value="high">High (15+)</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                  {searchTerm ||
                  specializationFilter ||
                  commissionFilter ||
                  studentCountFilter
                    ? "No teachers found matching your filters"
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
