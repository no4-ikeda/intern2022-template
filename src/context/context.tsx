import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { Schedule, Action } from "~/types/types";

const YearMonthContext = React.createContext(
  {} as {
    isShowCreateNewModal: boolean;
    setIsShowCreateNewModal: Dispatch<SetStateAction<boolean>>;
    isShowEditModal: boolean;
    setIsShowEditModal: Dispatch<SetStateAction<boolean>>;
    isShowDetailModal: boolean;
    setIsShowDetailModal: Dispatch<SetStateAction<boolean>>;
    isShowHolidayModal: boolean;
    setIsShowHolidayModal: Dispatch<SetStateAction<boolean>>;
    holiday: string[];
    setHoliday: Dispatch<SetStateAction<string[]>>;
    dispatchCalEvent: (args: Action) => void;
    savedEvents: Schedule[];
  }
);
export default YearMonthContext;
