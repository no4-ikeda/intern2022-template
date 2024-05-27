import { DefaultValue, atom, selector } from "recoil";
import type { Holiday, Schedule } from "~/types/types";

type ModalProps = {
  isShowDetailModal: boolean;
  isShowHolidayModal: boolean;
  isShowInputModal: boolean;
};

type SaveScheduleProps = {
  savedSchedules: Schedule[];
  type?: "push" | "update" | "delete";
  payload: Schedule;
};

type ScheduleToSaveProps = {
  schedule: Schedule[];
};

// モーダル管理
export const isShowModalAtom = atom<ModalProps>({
  key: "modalState",
  default: {
    isShowDetailModal: false,
    isShowHolidayModal: false,
    isShowInputModal: false,
  },
});

// APIから取得する祝日管理
export const holidayListAtom = atom<Holiday[]>({
  key: "HolidayList",
  default: [],
});

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
    savedSchedules: initSchedules(),
    payload: {
      title: "",
      date: null,
      startTime: "",
      endTime: "",
      memo: "",
      id: 0,
    },
  },
});

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
      case "push":
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
