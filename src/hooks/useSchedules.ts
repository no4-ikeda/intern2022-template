import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { savedScheduleAtom } from "~/atoms/savedScheduleAtom";
import type { Schedule } from "~/types/types";
import { useLocalStorage } from "./useLocalStorage";

export const useSchedules = () => {
  const [savedSchedules, setSaveSchedule] = useRecoilState(savedScheduleAtom);
  const { saveSchedules } = useLocalStorage();

  const addSchedule = useCallback(
    (enteredSchedule: Schedule) => {
      const scheduleToSave = [...savedSchedules, enteredSchedule];

      setSaveSchedule(scheduleToSave);

      saveSchedules(scheduleToSave);
    },
    [savedSchedules, setSaveSchedule, saveSchedules]
  );

  const updateSchedule = useCallback(
    (enteredSchedule: Schedule) => {
      const scheduleToSave = savedSchedules.map((schedule) =>
        schedule.id === enteredSchedule.id ? enteredSchedule : schedule
      );

      setSaveSchedule(scheduleToSave);
    },
    [savedSchedules, setSaveSchedule]
  );

  const deleteSchedule = useCallback(
    (selectedSchedule: Schedule) => {
      const scheduleToSave = savedSchedules.filter(
        (schedule) => schedule.id !== selectedSchedule.id
      );

      setSaveSchedule(scheduleToSave);

      localStorage.setItem("savedSchedules", JSON.stringify(scheduleToSave));
    },
    [savedSchedules, setSaveSchedule]
  );

  return { savedSchedules, addSchedule, updateSchedule, deleteSchedule };
};
