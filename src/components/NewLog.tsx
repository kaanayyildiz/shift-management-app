"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./DatePicker";
import { ProjectPicker } from "./ProjectPicker";
import { useLogStore } from "@/store";
import { useToast } from "@/components/ui/use-toast";
import dayjs from "dayjs";

export function NewLog() {
  const { toast } = useToast();
  const log = useLogStore((state) => state.log);
  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);

  const closeDialog = () => {
    document.getElementById("close-btn")?.click();
  };

  const validateLog = () => {
    if (!log.date || !log.hour || log.hour === 0) {
      throw "Tarih veya saat değerleri boş.";
    } else if (log.hour >= 24) {
      throw "Lütfen geçerli bir saat girin.";
    }
  };

  const submitLog = () => {
    try {
      validateLog();
      setLogs(log, dayjs(log.date).format("YYYY-MM-DD"));
      toast({
        title: "Puantaj girişi başarılı",
        description: `${log.hour} saat ${dayjs(log.date).format("DD-MM-YYYY")}`,
      });
      closeDialog();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Log Hatası",
        description: e as string,
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setLog({
      ...log,
      [field]: value === "" ? "" : parseInt(value as string, 10) || "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-72">
          Yeni Puantaj
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-left">Yeni Puantaj</DialogTitle>
          <DialogDescription className="text-left">
            Puantaj bilgisini tarih, proje, personel{"(id)"} seçimiyle
            girebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center">
              <Label htmlFor="tarih" className="text-left">
                Tarih{" "}
              </Label>
              <DatePicker />
            </div>
            <div className="grid grid-cols-5 items-center">
              <Label htmlFor="proje" className="text-left">
                Proje{" "}
              </Label>
              <ProjectPicker />
            </div>
            <div className="grid grid-cols-5 items-center">
              <Label htmlFor="saat" className="text-left">
                Saat
              </Label>
              <Input
                id="saat"
                className="col-span-4"
                type="text"
                value={log.hour}
                onChange={(e) => handleInputChange("hour", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-5 items-center">
              <Label htmlFor="personel" className="text-left">
                Personel
              </Label>
              <Input
                id="personel"
                className="col-span-4"
                type="text"
                placeholder="Personel ID girin"
                value={log.person}
                onChange={(e) => handleInputChange("person", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-5 items-center">
              <Label htmlFor="notes" className="text-left">
                Not
              </Label>
              <Input
                id="notes"
                className="col-span-4"
                type="text"
                placeholder="İsteğe bağlı"
                onChange={(e) =>
                  setLog({
                    ...log,
                    note: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitLog}>
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
