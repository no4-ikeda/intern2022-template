import { DefaultValue, selector } from "recoil";
import type { SaveScheduleProps, ScheduleToSaveProps } from "~/types/types";
import { saveScheduleInfoAtom } from "./savedScheduleAtom";

// ローカルストレージに保存する処理
export const savedScheduleSelector = selector<SaveScheduleProps>({
  key: "saveSchedule",
  get: ({ get }) => {
    return get(saveScheduleInfoAtom);
  },
  set: ({ get, set }, action) => {
    if (action instanceof DefaultValue) return;
    const saveScheduleInfo = get(saveScheduleInfoAtom);
    const scheduleToSave: ScheduleToSaveProps = { schedule: [] };

    switch (action.type) {
      case "add":
        scheduleToSave.schedule = [
          ...saveScheduleInfo.savedSchedules,
          action.payload,
        ];
        break;
      case "update":
        scheduleToSave.schedule = saveScheduleInfo.savedSchedules.map(
          (schedule) =>
            schedule.id === action.payload.id ? action.payload : schedule
        );
        break;
      case "delete":
        scheduleToSave.schedule = saveScheduleInfo.savedSchedules.filter(
          (schedule) => schedule.id !== action.payload.id
        );
        break;
      default:
        throw new Error();
    }

    localStorage.setItem(
      "savedSchedules",
      JSON.stringify(scheduleToSave.schedule)
    );
    set(saveScheduleInfoAtom, {
      ...saveScheduleInfo,
      savedSchedules: scheduleToSave.schedule,
    });
  },
});
