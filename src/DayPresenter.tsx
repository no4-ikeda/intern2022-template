import type { DayPresenterProps } from "./types/types";

export default function DayPresenter({
  handleCreateNewClick,
  isToday,
  handleHolidayClick,
  handleScheduleClick,
  date,
  currentMonthIndex,
  holidayToday,
  dayEvents,
}: DayPresenterProps) {
  return (
    <div className="gridChild" onClick={() => handleCreateNewClick(date)}>
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
        <div className="holiday" onClick={(e) => handleHolidayClick(e, date)}>
          {holidayToday}
        </div>

        {/** 予定表示 */}
        {dayEvents.map((event, idx) => (
          <div
            key={idx}
            className="dayEvent"
            onClick={(e) => {
              handleScheduleClick(e, event);
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
}
