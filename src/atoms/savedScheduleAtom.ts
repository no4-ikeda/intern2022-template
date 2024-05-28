import { atom } from "recoil";
import type { SaveScheduleProps, Schedule } from "~/types/types";

// localstorageに入っている値を取得する
const initSchedules = (): Schedule[] => {
  const storageSchedules = localStorage.getItem("savedSchedules");
  const parsedSchedules: Schedule[] = storageSchedules
    ? (JSON.parse(storageSchedules) as Schedule[])
    : [];
  return parsedSchedules;
};

// ローカルストレージに保存するスケジュール
export const saveScheduleInfoAtom = atom<SaveScheduleProps>({
  key: "saveScheduleState",
  default: {
    schedules: initSchedules(),
  },
});
