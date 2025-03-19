import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Student name must be at least 2 characters.",
  }),
  fname: z.string().min(2, {
    message: "Father's name must be at least 2 characters.",
  }),
  course: z.string({
    required_error: "Please select a course.",
  }),
  fee: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Fee must be a positive number.",
  }),
  teacherId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface StudentRegistrationFormProps {
  onSubmit?: (values: FormValues) => void;
  courses?: { id: string; name: string; fee: number }[];
  teachers?: { id: string; name: string }[];
}

const StudentRegistrationForm = ({
  onSubmit = (values) => console.log(values),
  courses = [
    { id: "1", name: "Mathematics", fee: 500 },
    { id: "2", name: "Science", fee: 600 },
    { id: "3", name: "English", fee: 450 },
    { id: "4", name: "Computer Science", fee: 700 },
    { id: "5", name: "History", fee: 400 },
  ],
  teachers = [
    { id: "1", name: "Ms. Johnson" },
    { id: "2", name: "Mr. Wilson" },
    { id: "3", name: "Dr. Roberts" },
    { id: "4", name: "Mrs. Thompson" },
    { id: "5", name: "Prof. Anderson" },
  ],
}: StudentRegistrationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fname: "",
      course: "",
      fee: "",
      teacherId: "",
    },
  });

  const handleCourseChange = (value: string) => {
    const selectedCourse = courses.find((course) => course.id === value);
    if (selectedCourse) {
      form.setValue("fee", selectedCourse.fee.toString());
    }
  };

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
    form.reset();
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"
      id="student-form"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Student Registration
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the first name of the student.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Father's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter father's name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the father's name of the student.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCourseChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name} (${course.fee})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the course the student wants to enroll in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Fee ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Course fee"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!isNaN(Number(value)) || value === "") {
                          field.onChange(value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    The fee will be automatically filled when you select a
                    course, but you can adjust it if needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teacherId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Teacher (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a teacher" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Optionally assign a teacher to this student.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" />
              Register Student
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentRegistrationForm;
