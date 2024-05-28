import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";
import { saveScheduleInfoAtom } from "~/atoms/savedScheduleAtom";
import type { Schedule, SaveScheduleProps } from "~/types/types";

export const useSchedules = () => {
  const [savedSchedules, setSaveSchedule] =
    useRecoilState(saveScheduleInfoAtom);
  const scheduleToSave = useMemo((): SaveScheduleProps => {
    return { schedules: [] };
  }, []);

  const addSchedule = useCallback(
    (enteredSchedule: Schedule) => {
      scheduleToSave.schedules = [...savedSchedules.schedules, enteredSchedule];

      setSaveSchedule({ schedules: scheduleToSave.schedules });

      localStorage.setItem(
        "savedSchedules",
        JSON.stringify(scheduleToSave.schedules)
      );
    },
    [savedSchedules.schedules, scheduleToSave, setSaveSchedule]
  );

  const updateSchedule = useCallback(
    (enteredSchedule: Schedule) => {
      scheduleToSave.schedules = savedSchedules.schedules.map((schedule) =>
        schedule.id === enteredSchedule.id ? enteredSchedule : schedule
      );

      setSaveSchedule({ schedules: scheduleToSave.schedules });

      localStorage.setItem(
        "savedSchedules",
        JSON.stringify(scheduleToSave.schedules)
      );
    },
    [scheduleToSave, savedSchedules.schedules, setSaveSchedule]
  );

  const deleteSchedule = useCallback(
    (selectedSchedule: Schedule) => {
      scheduleToSave.schedules = savedSchedules.schedules.filter(
        (schedule) => schedule.id !== selectedSchedule.id
      );

      setSaveSchedule({ schedules: scheduleToSave.schedules });

      localStorage.setItem(
        "savedSchedules",
        JSON.stringify(scheduleToSave.schedules)
      );
    },
    [savedSchedules.schedules, scheduleToSave, setSaveSchedule]
  );

  return { savedSchedules, addSchedule, updateSchedule, deleteSchedule };
};
