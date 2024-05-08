import { useState, useEffect, useReducer } from "react";
import YearMonthContext from "./Context";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Action, ScheduleState, WrapperProps } from "~/types/types";

// 追加、編集、削除処理
const savedEventsReducer = (
  stateList: ScheduleState[],
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
const initEvents = (): ScheduleState[] => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents: ScheduleState[] = storageEvents
    ? (JSON.parse(storageEvents) as ScheduleState[])
    : [];
  return parsedEvents;
};

const ContextWrapper = (props: WrapperProps) => {
  const [daySelected, setDaySelected] = useState<Dayjs>(dayjs());
  const [isShowCreateNewModal, setIsShowCreateNewModal] =
    useState<boolean>(false);
  const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState<boolean>(false);
  const [isShowHolidayModal, setIsShowHolidayModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleState | null>(
    null
  );
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
        daySelected,
        setDaySelected,
        isShowCreateNewModal,
        setIsShowCreateNewModal,
        isShowEditModal,
        setIsShowEditModal,
        isShowDetailModal,
        setIsShowDetailModal,
        isShowHolidayModal,
        setIsShowHolidayModal,
        selectedEvent,
        setSelectedEvent,
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
