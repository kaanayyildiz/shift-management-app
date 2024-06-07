"use client";

import * as React from "react";
import { format, isBefore, startOfToday } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useLogStore } from "@/store";
import { SelectSingleEventHandler } from "react-day-picker";

export function DatePicker() {
  const log = useLogStore((state) => state.log);
  const setDate = useLogStore((state) => state.setDate);
  const date = log.date as Date;
  const today = startOfToday();

  const handleDateSelect: SelectSingleEventHandler = (selectedDate) => {
    if (selectedDate && !isBefore(selectedDate, today)) {
      setDate(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal col-span-4",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {log.date ? format(date, "PPP") : <span>Tarih seçimi</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={log.date as Date}
          onSelect={handleDateSelect}
          initialFocus
          fromDate={today} // This prop restricts dates before today
        />
      </PopoverContent>
    </Popover>
  );
}
