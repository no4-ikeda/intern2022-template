import type React from "react";
import { Day } from "./Day";
import type { Dayjs } from "dayjs";
import type { MonthProps } from "./types/types";

export const Month = ({ currentPageMonth, dateMatrix }: MonthProps) => {
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
          <Day currentPageMonth={currentPageMonth} date={date} key={idx} />
        ))}
      </div>
    </>
  );
};
