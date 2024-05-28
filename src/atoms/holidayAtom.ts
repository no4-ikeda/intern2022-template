import { atom } from "recoil";
import type { Holiday } from "~/types/types";

// APIから取得する祝日管理
export const holidayListAtom = atom<Holiday[]>({
  key: "HolidayList",
  default: [],
});
