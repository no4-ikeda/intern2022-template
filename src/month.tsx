import type React from "react";
import { DayContainer } from "./DayContainer";
import type { Dayjs } from "dayjs";
import type { MonthProps } from "./types/types";

export const Month = ({
  currentPageMonth,
  dateMatrix,
  handleClickCreateNew,
  handleClickHoliday,
  handleClickEvent,
}: MonthProps) => {
  return (
    <>
      <div className="dayOfWeek">
        <div className="dayOfWeekItem">日曜日</div>
        <div className="dayOfWeekItem">月曜日</div>
        <div className="dayOfWeekItem">火曜日</div>
        <div className="dayOfWeekItem">水曜日</div>
        <div className="dayOfWeekItem">木曜日</div>
        <div className="dayOfWeekItem">金曜日</div>
        <div className="dayOfWeekItem">土曜日</div>
      </div>
      <div className="gridParent">
        {dateMatrix.map<React.ReactElement>((date: Dayjs, idx: number) => (
          <DayContainer
            currentPageMonth={currentPageMonth}
            date={date}
            key={idx}
            handleClickCreateNew={handleClickCreateNew}
            handleClickHoliday={handleClickHoliday}
            handleClickEvent={handleClickEvent}
          />
        ))}
      </div>
    </>
  );
};
