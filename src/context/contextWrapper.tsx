import type { ReactNode } from "react";
import { useState, useEffect, useReducer } from "react";
import YearMonthContext from "./context";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

//
type Props = {
  children: ReactNode;
};

type State = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
  id: number;
};

type PushAction = {
  type: "push";
  payload: State;
};
type UpdateAction = {
  type: "update";
  payload: State;
};
type DeleteAction = {
  type: "delete";
  payload: State;
};
export type Action = PushAction | UpdateAction | DeleteAction;

//追加、編集、削除処理
const savedEventsReducer = (stateList: State[], { type, payload }: Action) => {
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

//ストレージに入った予定を返す
const initEvents = (): State[] => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents: State[] = storageEvents
    ? (JSON.parse(storageEvents) as State[])
    : [];
  return parsedEvents;
};

const ContextWrapper = (props: Props) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [daySelected, setDaySelected] = useState<Dayjs>(dayjs());
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showHolidayModal, setShowHolidayModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<State | null>(null);
  const [holiday, setHoliday] = useState<string[]>([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  //savedEventが更新されたとき実行
  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  return (
    <YearMonthContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showModal,
        setShowModal,
        showEditModal,
        setShowEditModal,
        showDetailModal,
        setShowDetailModal,
        showHolidayModal,
        setShowHolidayModal,
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
