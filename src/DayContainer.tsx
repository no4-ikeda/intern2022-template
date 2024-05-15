import dayjs from "dayjs";
import { useContext, useMemo } from "react";
import YearMonthContext from "./context/Context";
import type { DayContainerProps, Schedule } from "./types/types";
import DayPresentation from "./DayPresenter";

export const DayContainer = ({
  currentPageMonth,
  date,
  handleCreateNewClick,
  handleHolidayClick,
  handleScheduleClick,
}: DayContainerProps) => {
  const { savedEvents, holiday } = useContext(YearMonthContext);

  const holidayKeys: string[] = Object.keys(holiday);
  const holidayValues: string[] = Object.values(holiday);

  const holidayIndex = holidayKeys.findIndex(
    (data) => data === date.format("YYYY-MM-DD")
  );
  const holidayToday = holidayValues[holidayIndex];

  // 今日を色付け
  const isToday = (): boolean => {
    return date.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
  };

  // savedEventsから１日分のイベントを取り出す
  const dayEvents = useMemo(() => {
    const events: Schedule[] = savedEvents.filter(
      (event) =>
        dayjs(event.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
    );
    return events;
  }, [savedEvents, date]);

  // 表示されている月を区別する
  const currentMonthIndex = dayjs(
    new Date(dayjs().year(), currentPageMonth)
  ).month();

  return (
    <>
      <DayPresentation
        handleCreateNewClick={handleCreateNewClick}
        isToday={isToday}
        handleHolidayClick={handleHolidayClick}
        handleScheduleClick={handleScheduleClick}
        date={date}
        currentMonthIndex={currentMonthIndex}
        holidayToday={holidayToday}
        dayEvents={dayEvents}
      />
    </>
  );
};
