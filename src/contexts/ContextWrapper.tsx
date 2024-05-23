import type { ReactNode } from "react";
import { useState, useEffect, useReducer } from "react";
import { YearMonthContext } from "./YearMonthContext";
import type { Action, Holiday, Schedule } from "~/types/types";

type Props = {
  children: ReactNode;
};

// 追加、編集、削除処理
const savedSchedulesReducer = (
  stateList: Schedule[],
  { type, payload }: Action
) => {
  switch (type) {
    case "push":
      return [...stateList, payload];
    case "update":
      return stateList.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return stateList.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

// ストレージに入った予定を返す
const initSchedules = (): Schedule[] => {
  const storageSchedules = localStorage.getItem("savedSchedules");
  const parsedSchedules: Schedule[] = storageSchedules
    ? (JSON.parse(storageSchedules) as Schedule[])
    : [];
  return parsedSchedules;
};

export const ContextWrapper = (props: Props) => {
  const [isShowDetailModal, setIsShowDetailModal] = useState<boolean>(false);
  const [isShowHolidayModal, setIsShowHolidayModal] = useState<boolean>(false);
  const [isShowInputModal, setIsShowInputModal] = useState<boolean>(false);
  const [holidayList, setHolidayList] = useState<Holiday[]>([]);
  const [savedSchedules, dispatchCalSchedule] = useReducer(
    savedSchedulesReducer,
    [],
    initSchedules
  );

  // savedScheduleが更新されたとき実行
  useEffect(() => {
    localStorage.setItem("savedSchedules", JSON.stringify(savedSchedules));
  }, [savedSchedules]);

  return (
    <YearMonthContext.Provider
      value={{
        isShowDetailModal,
        isShowHolidayModal,
        isShowInputModal,
        holidayList,
        savedSchedules,
        setIsShowDetailModal,
        setIsShowHolidayModal,
        setIsShowInputModal,
        setHolidayList,
        dispatchCalSchedule,
      }}
    >
      {props.children}
    </YearMonthContext.Provider>
  );
};
