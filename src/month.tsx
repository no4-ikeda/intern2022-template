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
      <table className="dayOfWeek">
        <thead>
          <tr>
            <td>日曜日</td>
            <td>月曜日</td>
            <td>火曜日</td>
            <td>水曜日</td>
            <td>木曜日</td>
            <td>金曜日</td>
            <td>土曜日</td>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div className="gridParent">
        {currentMonth.map<React.ReactElement>((row: Dayjs[], i: number) => (
          <React.Fragment key={i}>
            {row.map<React.ReactElement>((day: Dayjs, idx: number) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
