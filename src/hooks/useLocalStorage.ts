import type { Schedule } from "~/types/types";

export const useLocalStorage = () => {
  const getSchedule = (): Schedule[] => {
    const storageSchedules = localStorage.getItem("savedSchedules");
    const parsedSchedules: Schedule[] = storageSchedules
      ? (JSON.parse(storageSchedules) as Schedule[])
      : [];
    return parsedSchedules;
  };

  const saveSchedules = (schedules: Schedule[]) => {
    localStorage.setItem("savedSchedules", JSON.stringify(schedules));
  };

  return { getSchedule, saveSchedules };
};
