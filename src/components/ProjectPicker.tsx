"use client";

import * as React from "react";
import {
  ChevronUpDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLogStore } from "@/store";

const projects = [
  {
    value: "IM0001 GENEL-GİDER",
    label: "IM0001 GENEL-GİDER",
  },
  {
    value: "IM0022 LAKHTA CENTER",
    label: "IM0022 LAKHTA CENTER",
  },
  {
    value: "IM0023 KAVO DENTAL",
    label: "IM0023 KAVO DENTAL",
  },
  {
    value: "IM0024 SCHNEIDER-ELECTRIC ENERGY",
    label: "IM0024 SCHNEIDER-ELECTRIC ENERGY",
  },
  {
    value: "IM0025 B.L.H. ERBİL (9051)",
    label: "IM0025 B.L.H. ERBİL (9051)",
  },
  {
    value: "IM0026 B.L.H. HONDURAS (9072)",
    label: "IM0026 B.L.H. HONDURAS (9072)",
  },
  {
    value: "IM0027 B.L.H. FAS (9073)",
    label: "IM0027 B.L.H. FAS (9073)",
  },
  {
    value: "IM0028 İNOKSNET GENEL",
    label: "IM0028 İNOKSNET GENEL",
  },
  {
    value: "IM0029 LANİT LİFT HOLL (9075)",
    label: "IM0029 LANİT LİFT HOLL (9075)",
  },
  {
    value: "IM0030 PRIDEX LIFT HOLL (9076)",
    label: "IM0030 PRIDEX LIFT HOLL (9076)",
  },
  {
    value: "IM0031 PRIDEX STAGE 19-21 (9082)",
    label: "IM0031 PRIDEX STAGE 19-21 (9082)",
  },

  {
    value: "IM0032 I-TECO LIFT HOLL (9083)",
    label: "IM0032 I-TECO LIFT HOLL (9083)",
  },
  {
    value: "IM0033 LIIS LIFT HOLL (9086)",
    label: "IM0033 LIIS LIFT HOLL (9086)",
  },
  {
    value: "IM0034 EST LIFT HOLL (9087)",
    label: "IM0034 EST LIFT HOLL (9087)",
  },
  {
    value: "IM0035 KULTUR MAKRO FABRIC 79-80 MLZ. (9090)",
    label: "IM0035 KULTUR MAKRO FABRIC 79-80 MLZ. (9090)",
  },
  {
    value: "IM0036 AZERBAYCAN MERKEZ BANKASI (9094)",
    label: "IM0036 AZERBAYCAN MERKEZ BANKASI (9094)",
  },
  {
    value: "IM0037 YANDEX ANKRAJ CEPHE ÇELİK (9093)",
    label: "IM0037 YANDEX ANKRAJ CEPHE ÇELİK (9093)",
  },
  {
    value: "IM0038 YANDEX FASAD ÇELİKLERİ (9096)",
    label: "IM0038 YANDEX FASAD ÇELİKLERİ (9096)",
  },
  {
    value: "IM0039 YANDEX KORKULUK",
    label: "IM0039 YANDEX KORKULUK",
  },
  {
    value: "IM0040 SBERBANK",
    label: "IM0040 SBERBANK",
  },
  {
    value: "IM0041 ELEKTROPROF",
    label: "IM0041 ELEKTROPROF",
  },
];

export function ProjectPicker() {
  const [open, setOpen] = React.useState(false);
  const selectedProject = useLogStore((state) => state.log.project);
  const setProject = useLogStore((state) => state.setProject);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between col-span-4"
        >
          {selectedProject
            ? projects.find((project) => project.value === selectedProject)?.label
            : "Proje seçimi..."}
          <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Proje ara.." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.value}
                  value={project.value}
                  onSelect={(currentValue) => {
                    setProject(currentValue === selectedProject ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedProject === project.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {project.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
