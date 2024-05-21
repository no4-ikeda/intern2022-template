import type React from "react";
import type { Dayjs } from "dayjs";
import { useDateMatrix } from "~/hooks/useDateMatrix";
import type { Schedule } from "~/types/types";
import Day from "./Day";

type CalendarBodyProps = {
  onCreateNewClick: (date: Dayjs) => void;
  onHolidayClick: (date: Dayjs) => void;
  onScheduleClick: (schedule: Schedule) => void;
  currentPageYear: number;
  currentPageMonth: number;
};

export const CalendarBody = ({
  onCreateNewClick,
  onHolidayClick,
  onScheduleClick,
  currentPageYear,
  currentPageMonth,
}: CalendarBodyProps) => {
  const dateMatrix = useDateMatrix(currentPageYear, currentPageMonth);

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
          <Day
            key={idx}
            onCreateNewClick={onCreateNewClick}
            onHolidayClick={onHolidayClick}
            onScheduleClick={onScheduleClick}
            currentPageMonth={currentPageMonth}
            date={date}
          />
        ))}
      </div>
    </>
  );
};
