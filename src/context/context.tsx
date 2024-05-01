import type { Dayjs } from "dayjs";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { Action } from "./contextWrapper";

type State = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
  id: number;
};

const YearMonthContext = React.createContext(
  {} as {
    monthIndex: number;
    setMonthIndex: React.Dispatch<React.SetStateAction<number>>;
    daySelected: Dayjs;
    setDaySelected: Dispatch<SetStateAction<Dayjs>>;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    showEditModal: boolean;
    setShowEditModal: Dispatch<SetStateAction<boolean>>;
    showDetailModal: boolean;
    setShowDetailModal: Dispatch<SetStateAction<boolean>>;
    showHolidayModal: boolean;
    setShowHolidayModal: Dispatch<SetStateAction<boolean>>;
    selectedEvent: State | null;
    setSelectedEvent: Dispatch<SetStateAction<State | null>>;
    holiday: string[];
    setHoliday: Dispatch<SetStateAction<string[]>>;
    dispatchCalEvent: (args: Action) => void;
    savedEvents: State[];
  }
);
export default YearMonthContext;
