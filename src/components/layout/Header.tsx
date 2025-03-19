import React from "react";
import { User, Users } from "lucide-react";

interface HeaderProps {
  title?: string;
}

const Header = ({
  title = "Student & Teacher Management System",
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-primary text-primary-foreground shadow-md flex items-center justify-between px-6">
      <div className="flex items-center space-x-2">
        <Users className="h-6 w-6" />
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center space-x-2">
        <User className="h-5 w-5" />
        <span className="text-sm">Admin User</span>
      </div>
    </header>
  );
};

export default Header;
