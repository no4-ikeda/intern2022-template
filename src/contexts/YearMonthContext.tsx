import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { Schedule, Action, Holiday } from "~/types/types";

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
    holidayList: Holiday[];
    setHolidayList: Dispatch<SetStateAction<Holiday[]>>;
    dispatchCalSchedule: (args: Action) => void;
    savedSchedules: Schedule[];
  }
);
export default YearMonthContext;
