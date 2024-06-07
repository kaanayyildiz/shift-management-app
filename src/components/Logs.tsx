"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLogStore } from "@/store";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

export function Logs() {
  const logs = useLogStore((state) => state.logs);

  const totalHours = Object.keys(logs).reduce((sum, key) => {
    const logGroup = logs[key];
    return sum + logGroup.reduce((groupSum, log) => groupSum + log.hour, 0);
  }, 0);

  return (
    <Table>
      <TableCaption>Çalışma saatleri log kayıtları.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tarih</TableHead>
          <TableHead>Proje</TableHead>
          <TableHead>Not</TableHead>
          <TableHead>Saat</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(logs).map((date) => {
          return logs[date].map((log, index) => (
            <TableRow key={date + "-" + index} className={cn(log.hour <= 5 ? "bg-red-100" : "")}>
              <TableCell className="font-medium">{dayjs(log.date).format("DD-MM-YYYY")}</TableCell>
              <TableCell>{log.project}</TableCell>
              <TableCell>{log.note}</TableCell>
              <TableCell>{log.hour}</TableCell>
            </TableRow>
          ));
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Toplam</TableCell>
          <TableCell className="text-right">{totalHours}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
