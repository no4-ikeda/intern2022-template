import dayjs from "dayjs";
import { useCallback, useContext, useMemo } from "react";
import YearMonthContext from "./context/Context";
import useFetchHoliday from "./hooks/useFetchHoliday";
import type { DayProps, ScheduleState } from "./types/types";

export const Day = ({ currentPageMonth, date }: DayProps) => {
  const {
    setDaySelected,
    setIsShowCreateNewModal,
    savedEvents,
    setSelectedEvent,
    setIsShowDetailModal,
    setIsShowHolidayModal,
    holiday,
  } = useContext(YearMonthContext);

  // カスタムフックから祝日を取得
  useFetchHoliday(dayjs(new Date(dayjs().year(), currentPageMonth)).year());
  const holidayKeys: string[] = Object.keys(holiday);
  const holidayValues: string[] = Object.values(holiday);

  const holidayIndex = holidayKeys.findIndex(
    (data) => data === date.format("YYYY-MM-DD")
  );
  const holidayToday = holidayValues[holidayIndex];

  // 今日を色付け
  const isToday = (): boolean => {
    return date.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  };

  // savedEventsから１日分のイベントを取り出す
  const dayEvents = useMemo(() => {
    const events: ScheduleState[] = savedEvents.filter(
      (event) =>
        dayjs(event.date).format("DD-MM-YY") === date.format("DD-MM-YY")
    );
    return events;
  }, [savedEvents, date]);

  // 表示されている月を区別する
  const currentMonthIndex = dayjs(
    new Date(dayjs().year(), currentPageMonth)
  ).month();

  // 日付のセルが押されたとき
  const handleClickCreateNew = useCallback(() => {
    setDaySelected(date);
    setIsShowCreateNewModal(true);
  }, [date, setDaySelected, setIsShowCreateNewModal]);

  // 祝日がクリックされたとき
  const handleClickHoliday = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsShowHolidayModal(true);
      setDaySelected(date);
      e.stopPropagation();
    },
    [date, setDaySelected, setIsShowHolidayModal]
  );

  // 予定がクリックされたとき
  const handleClickEvent = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, event: ScheduleState) => {
      setSelectedEvent(event);
      setIsShowDetailModal(true);
      e.stopPropagation();
    },
    [setIsShowDetailModal, setSelectedEvent]
  );

  return (
    <div className="gridChild" onClick={handleClickCreateNew}>
      <div>
        <div>
          {/* 当日にtodayというクラス名にする */}
          <div className={isToday() ? "today" : ""}>
            {/** 今月分だけ色を変える */}
            <span
              className={
                date.month() === currentMonthIndex ? "" : "differentMonth"
              }
            >
              {date.format("D")}日
            </span>
          </div>
        </div>

        {/* 祝日表示 */}
        <div className="holiday" onClick={(e) => handleClickHoliday(e)}>
          {holidayToday}
        </div>

        {/** 予定表示 */}
        {dayEvents.map((event, idx) => (
          <div
            key={idx}
            className="dayEvent"
            onClick={(e) => {
              handleClickEvent(e, event);
            }}
          >
            {event.title}
          </div>
        ))}

        {/** 新規作成ボタン */}
        <div className="createNew">新規作成...</div>
      </div>
    </div>
  );
};
