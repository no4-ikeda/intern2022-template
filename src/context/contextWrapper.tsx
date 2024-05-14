import { useState, useEffect, useReducer } from "react";
import YearMonthContext from "./Context";
import type { Action, Schedule, WrapperProps } from "~/types/types";

// 追加、編集、削除処理
const savedEventsReducer = (
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
const initEvents = (): Schedule[] => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents: Schedule[] = storageEvents
    ? (JSON.parse(storageEvents) as Schedule[])
    : [];
  return parsedEvents;
};

const ContextWrapper = (props: WrapperProps) => {
  const [isShowCreateNewModal, setIsShowCreateNewModal] =
    useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState<boolean>(false);
  const [isShowHolidayModal, setIsShowHolidayModal] = useState<boolean>(false);
  const [holiday, setHoliday] = useState<string[]>([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  // savedEventが更新されたとき実行
  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  return (
    <YearMonthContext.Provider
      value={{
        isShowCreateNewModal,
        setIsShowCreateNewModal,
        isShowEditModal,
        setIsShowEditModal,
        isShowDetailModal,
        setIsShowDetailModal,
        isShowHolidayModal,
        setIsShowHolidayModal,
        holiday,
        setHoliday,
        dispatchCalEvent,
        savedEvents,
      }}
    >
      {props.children}
    </YearMonthContext.Provider>
  );
};

export default ContextWrapper;
