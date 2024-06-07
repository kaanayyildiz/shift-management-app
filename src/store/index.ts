// store.ts
import { create } from "zustand";

export type Log = {
  project: string;
  person: number;
  note: string;
  hour: number;
  date: Date;
};

export type ResultLog = {
  project: string;
  person: number;
  note: string;
  hour: number;
  date: string;
};

interface LogState {
  log: Log;
  logs: {
    [key: string]: Log[];
  };
  setLog: (log: Log) => void;
  setProject: (project: string) => void;
  setDate: (date: Date) => void;
  setLogs: (log: Log, key: string) => void;
}

export const useLogStore = create<LogState>()((set) => ({
  log: {
    note: "",
    project: "",
    person: 0,
    hour: 0,
    date: new Date(),
  },
  logs: {},
  setDate: (date: Date) => set((state) => ({ log: { ...state.log, date } })),
  setLog: (log: Log) => set((state) => ({ log: { ...state.log, ...log } })),
  setProject: (project: string) => set((state) => ({ log: { ...state.log, project } })),
  setLogs: (log: Log, key: string) =>
    set((state) => {
      const updateLog = {
        ...state.logs,
        [key]: state.logs[key] ? [...state.logs[key], log] : [log],
      };
      return { logs: updateLog };
    }),
}));
