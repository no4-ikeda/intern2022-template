import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import YearMonthContext from "./context/context";
import useFetchHoliday from "./hooks/useFetchHoliday";

type Props = {
  day: Dayjs;
};
export type State = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
  id: number;
};

export const Day = ({ day }: Props) => {
  const [dayEvents, setDayEvents] = useState<State[]>([]);
  const {
    setDaySelected,
    setShowModal,
    savedEvents,
    setSelectedEvent,
    setShowDetailModal,
    setShowHolidayModal,
    monthIndex,
  } = useContext(YearMonthContext);

  // カスタムフックから祝日を取得
  const holiday = useFetchHoliday(day.year());
  const holidayKeys = Object.keys(holiday);
  const holidayValues = Object.values(holiday);

  const holidayIndex = holidayKeys.findIndex(
    (data) => data === day.format("YYYY-MM-DD")
  );
  const holidayToday = holidayValues[holidayIndex];

  // 今月分だけを表示
  const thisMonth = day.month() === monthIndex && true;

  // 今日を色付け
  const getCalenderToday = (): boolean => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? true : false;
  };

  // savedEventsから１日分のイベントを取り出す
  useEffect(() => {
    const events: State[] = savedEvents.filter(
      (evt) => dayjs(evt.date).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  return (
    <div className="gridChild">
      <div>
        {/* 当日にtodayというクラス名にする */}
        <div className={getCalenderToday() ? "today" : ""}>
          <span className={thisMonth ? "" : "differentMonth"}>
            {day.format("D")}日
          </span>
        </div>
      </div>

      {/* 祝日表示 */}
      <div
        className="holiday"
        onClick={() => {
          setShowHolidayModal(true);
          setDaySelected(day);
        }}
      >
        {holidayToday}
      </div>
      {dayEvents.map((evt, idx) => (
        <div
          key={idx}
          className="dayEvent"
          onClick={() => {
            setSelectedEvent(evt);
            setShowDetailModal(true);
          }}
        >
          {evt.title}
        </div>
      ))}

      <div
        onClick={() => {
          setDaySelected(day);
          setShowModal(true);
        }}
        className="createNew"
      >
        新規作成...
      </div>
    </div>
  );
};