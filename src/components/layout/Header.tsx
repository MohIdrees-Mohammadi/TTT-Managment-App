import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { User, Users, BookOpen, PieChart } from "lucide-react";

interface HeaderProps {
  activeView?: "admin" | "teacher";
  onViewChange?: (view: "admin" | "teacher") => void;
  title?: string;
}

const Header = ({
  activeView = "admin",
  onViewChange = () => {},
  title = "Student & Teacher Management System",
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-primary text-primary-foreground shadow-md flex items-center justify-between px-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <Tabs
        defaultValue={activeView}
        onValueChange={(value) => onViewChange(value as "admin" | "teacher")}
        className="w-auto"
      >
        <TabsList className="bg-primary-foreground/10">
          <TabsTrigger
            value="admin"
            className="flex items-center gap-2 data-[state=active]:bg-primary-foreground/20"
          >
            <PieChart className="h-4 w-4" />
            Admin View
          </TabsTrigger>
          <TabsTrigger
            value="teacher"
            className="flex items-center gap-2 data-[state=active]:bg-primary-foreground/20"
          >
            <BookOpen className="h-4 w-4" />
            Teacher View
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center space-x-2">
        <User className="h-5 w-5" />
        <span className="text-sm">Admin User</span>
      </div>
    </header>
  );
};

export default Header;
