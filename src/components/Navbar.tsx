import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
export default function Navbar() {
  return (
    <div className="flex p-5 justify-between">
      <div className="flex items-center gap-x-1">
        <ClockIcon className="h-6 w-6" />
        <span className="text-xl font-semibold">inshift</span>
      </div>
      <div>
        <Button>Login</Button>
      </div>
    </div>
  );
}
