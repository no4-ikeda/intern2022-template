import type { Dayjs } from "dayjs";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { ScheduleState, Action } from "~/types/types";

const YearMonthContext = React.createContext(
  {} as {
    daySelected: Dayjs;
    setDaySelected: Dispatch<SetStateAction<Dayjs>>;
    isShowCreateNewModal: boolean;
    setIsShowCreateNewModal: Dispatch<SetStateAction<boolean>>;
    isShowEditModal: boolean;
    setIsShowEditModal: Dispatch<SetStateAction<boolean>>;
    isShowDetailModal: boolean;
    setIsShowDetailModal: Dispatch<SetStateAction<boolean>>;
    isShowHolidayModal: boolean;
    setIsShowHolidayModal: Dispatch<SetStateAction<boolean>>;
    selectedEvent: ScheduleState | null;
    setSelectedEvent: Dispatch<SetStateAction<ScheduleState | null>>;
    holiday: string[];
    setHoliday: Dispatch<SetStateAction<string[]>>;
    dispatchCalEvent: (args: Action) => void;
    savedEvents: ScheduleState[];
  }
);
export default YearMonthContext;
