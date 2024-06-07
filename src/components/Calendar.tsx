"use client";
import React from "react";
import dayjs from "dayjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";
import { useLogStore } from "@/store";

export default function Calendar() {
  const logs = useLogStore((state) => state.logs);

  function getDateInMonth(year = dayjs().year(), month = dayjs().month()) {
    const startDate = dayjs().year(year).month(month).date(1);
    const endDate = startDate.endOf("month");

    const datesArray = [];

    for (let i = startDate.date(); i <= endDate.date(); i++) {
      datesArray.push(startDate.date(i).format("DD-MM-YYYY"));
    }

    return datesArray;
  }

  const getColor = (value: number) => {
    if (value === 0) {
      return "bg-gray-100";
    } else if (value <= 10) {
      return "bg-green-300";
    } else {
      return "bg-green-500";
    }
  };

  const getTotalHoursForDate = (date: string) => {
    const logsForDate = Object.keys(logs).reduce((acc, key) => {
      if (dayjs(key).format("DD-MM-YYYY") === date) {
        acc.push(...logs[key]);
      }
      return acc;
    }, [] as any[]);
    return logsForDate.reduce((sum, log) => sum + log.hour, 0);
  };

  const dateArray = getDateInMonth();

  return (
    <div className="flex border flex-wrap gap-2 p-5 justify-center rounded-md">
      {dateArray.map((date, index) => {
        const totalHours = getTotalHoursForDate(date);

        return (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <div
                className={cn(
                  "h-5 w-5 rounded-sm cursor-pointer",
                  getColor(totalHours)
                )}
              ></div>
            </HoverCardTrigger>
            <HoverCardContent>
              {totalHours} saat çalışma {date}
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}
