import React, { useContext } from "react";
import { Day } from "./day";
import type { Dayjs } from "dayjs";
import YearMonthContext from "./context/context";

type Props = {
  month: Dayjs[][];
};

export const Month = ({ month }: Props) => {
  // カレンダーの余分な行を削除する
  const { monthIndex } = useContext(YearMonthContext);
  const currentMonth = month.filter((row) => {
    return row[0].month() === monthIndex || row[6].month() === monthIndex;
  });

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
        {currentMonth.map<React.ReactElement>((row: Dayjs[], i: number) => (
          <React.Fragment key={i}>
            {row.map<React.ReactElement>((day: Dayjs, idx: number) => (
              <Day day={day} key={idx} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
