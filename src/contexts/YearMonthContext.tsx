import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { Schedule, Action, Holiday } from "~/types/types";

export const YearMonthContext = React.createContext(
  {} as {
    isShowDetailModal: boolean;
    setIsShowDetailModal: Dispatch<SetStateAction<boolean>>;
    isShowHolidayModal: boolean;
    setIsShowHolidayModal: Dispatch<SetStateAction<boolean>>;
    isShowInputModal: boolean;
    setIsShowInputModal: Dispatch<SetStateAction<boolean>>;
    holidayList: Holiday[];
    setHolidayList: Dispatch<SetStateAction<Holiday[]>>;
    dispatchCalSchedule: (args: Action) => void;
    savedSchedules: Schedule[];
  }
);
