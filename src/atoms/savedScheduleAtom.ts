import { atom } from "recoil";
import type { Schedule } from "~/types/types";

// localstorageに入っている値を取得する
const initSchedules = (): Schedule[] => {
  const storageSchedules = localStorage.getItem("savedSchedules");
  const parsedSchedules: Schedule[] = storageSchedules
    ? (JSON.parse(storageSchedules) as Schedule[])
    : [];
  return parsedSchedules;
};

// ローカルストレージに保存されているスケジュール
export const savedScheduleAtom = atom<Schedule[]>({
  key: "savedScheduleState",
  default: initSchedules(),
});
