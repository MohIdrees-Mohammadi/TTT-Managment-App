import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Check, UserPlus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Student {
  id: string;
  name: string;
  course: string;
  fee: number;
  assignedTeacher?: string;
}

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  commissionRate: number;
}

interface Assignment {
  studentId: string;
  teacherId: string;
}

interface AssignmentInterfaceProps {
  students?: Student[];
  teachers?: Teacher[];
  assignments?: Assignment[];
  onAssign?: (studentId: string, teacherId: string) => void;
  onRemoveAssignment?: (studentId: string) => void;
}

const AssignmentInterface: React.FC<AssignmentInterfaceProps> = ({
  students = [
    { id: "s1", name: "John Doe", course: "Mathematics", fee: 500 },
    {
      id: "s2",
      name: "Jane Smith",
      course: "Physics",
      fee: 600,
      assignedTeacher: "t1",
    },
    { id: "s3", name: "Mike Johnson", course: "Chemistry", fee: 550 },
    {
      id: "s4",
      name: "Sarah Williams",
      course: "Biology",
      fee: 525,
      assignedTeacher: "t2",
    },
  ],
  teachers = [
    {
      id: "t1",
      name: "Dr. Alan Grant",
      specialization: "Mathematics",
      commissionRate: 0.4,
    },
    {
      id: "t2",
      name: "Prof. Ellie Sattler",
      specialization: "Biology",
      commissionRate: 0.35,
    },
    {
      id: "t3",
      name: "Dr. Ian Malcolm",
      specialization: "Physics",
      commissionRate: 0.45,
    },
  ],
  assignments = [],
  onAssign = () => {},
  onRemoveAssignment = () => {},
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState<string>("");

  const handleAssignSubmit = () => {
    if (selectedStudent && selectedTeacher) {
      onAssign(selectedStudent, selectedTeacher);
      setSelectedStudent("");
      setSelectedTeacher("");
      setConfirmDialogOpen(false);
    }
  };

  const handleRemoveAssignment = () => {
    if (studentToRemove) {
      onRemoveAssignment(studentToRemove);
      setStudentToRemove("");
      setRemoveDialogOpen(false);
    }
  };

  const getTeacherNameById = (teacherId: string) => {
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher ? teacher.name : "Not assigned";
  };

  const unassignedStudents = students.filter(
    (student) => !student.assignedTeacher,
  );
  const assignedStudents = students.filter(
    (student) => student.assignedTeacher,
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Student-Teacher Assignment Interface</CardTitle>
          <CardDescription>
            Assign students to teachers or manage existing assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* New Assignment Form */}
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg">Create New Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="student" className="text-sm font-medium">
                    Select Student
                  </label>
                  <Select
                    value={selectedStudent}
                    onValueChange={setSelectedStudent}
                  >
                    <SelectTrigger id="student">
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {unassignedStudents.length > 0 ? (
                        unassignedStudents.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} - {student.course}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No unassigned students
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="teacher" className="text-sm font-medium">
                    Select Teacher
                  </label>
                  <Select
                    value={selectedTeacher}
                    onValueChange={setSelectedTeacher}
                  >
                    <SelectTrigger id="teacher">
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name} - {teacher.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Dialog
                  open={confirmDialogOpen}
                  onOpenChange={setConfirmDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="w-full mt-4"
                      disabled={!selectedStudent || !selectedTeacher}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Assign Student to Teacher
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Assignment</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to assign
                        {selectedStudent &&
                          ` ${students.find((s) => s.id === selectedStudent)?.name}`}{" "}
                        to
                        {selectedTeacher &&
                          ` ${teachers.find((t) => t.id === selectedTeacher)?.name}`}
                        ?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setConfirmDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAssignSubmit}>
                        Confirm Assignment
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Current Assignments */}
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg">Current Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Teacher</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignedStudents.length > 0 ? (
                        assignedStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">
                              {student.name}
                            </TableCell>
                            <TableCell>{student.course}</TableCell>
                            <TableCell>
                              {getTeacherNameById(
                                student.assignedTeacher || "",
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <AlertDialog
                                open={
                                  removeDialogOpen &&
                                  studentToRemove === student.id
                                }
                                onOpenChange={(open) => {
                                  setRemoveDialogOpen(open);
                                  if (!open) setStudentToRemove("");
                                }}
                              >
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <AlertDialogTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() =>
                                            setStudentToRemove(student.id)
                                          }
                                        >
                                          <X className="h-4 w-4 text-red-500" />
                                        </Button>
                                      </AlertDialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Remove assignment</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Remove Assignment
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove the
                                      assignment for {student.name}? This action
                                      cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={handleRemoveAssignment}
                                    >
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center text-muted-foreground py-6"
                          >
                            No assignments found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentInterface;
