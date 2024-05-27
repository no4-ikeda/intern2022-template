import { useCallback, useMemo } from "react";
import type { Schedule } from "../../../../types/types";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { holidayListAtom, saveScheduleInfoAtom } from "~/globalState/states";

type Props = {
  currentPageMonth: number;
  date: dayjs.Dayjs;
  onCreateNewClick: (date: Dayjs) => void;
  onHolidayClick: (date: dayjs.Dayjs) => void;
  onScheduleClick: (schedule: Schedule) => void;
};

export const Day = ({
  currentPageMonth,
  date,
  onCreateNewClick,
  onHolidayClick,
  onScheduleClick,
}: Props) => {
  const holidayList = useRecoilValue(holidayListAtom);
  const savedSchedules = useRecoilValue(saveScheduleInfoAtom);

  const holiday = holidayList.filter((holiday) => {
    return holiday.date.isSame(date);
  })[0];

  // savedSchedulesから１日分のイベントを取り出す
  const daySchedules = useMemo(() => {
    const schedules: Schedule[] = savedSchedules.savedSchedules.filter(
      (schedule) =>
        dayjs(schedule.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")
    );
    return schedules;
  }, [savedSchedules, date]);

  // 表示月内の日であるか
  const isDayInCurrentMonth = currentPageMonth === date.month();

  // 今日であるか
  const isToday = (): boolean => {
    return date.format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");
  };

  // 新規作成押下時
  const handleCreateNewClick = useCallback(() => {
    onCreateNewClick(date);
  }, [date, onCreateNewClick]);

  // 祝日押下時
  const handleHolidayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onHolidayClick(date);
      e.stopPropagation();
    },
    [date, onHolidayClick]
  );

  // スケジュール押下時
  const handleScheduleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, schedule: Schedule) => {
      onScheduleClick(schedule);
      e.stopPropagation();
    },
    [onScheduleClick]
  );

  return (
    <div className="gridChild" onClick={handleCreateNewClick}>
      <div>
        <div>
          {/* 当日をtodayというクラス名にする */}
          <div className={isToday() ? "today" : "otherDay"}>
            {/** 今月分だけ色を変える */}
            <span
              className={
                isDayInCurrentMonth ? "dayInCurrentMonth" : "differentMonth"
              }
            >
              {date.format("D")}日
            </span>
          </div>
        </div>

        {/* 祝日表示 */}
        {holiday && (
          <div className="holiday" onClick={handleHolidayClick}>
            {holiday.text ?? ""}
          </div>
        )}

        {/** 予定表示 */}
        {daySchedules.map((schedule, idx) => (
          <div
            key={idx}
            className="daySchedule"
            onClick={(e) => handleScheduleClick(e, schedule)}
          >
            {schedule.title}
          </div>
        ))}

        {/** 新規作成ボタン */}
        <div className="createNew">新規作成...</div>
      </div>
    </div>
  );
};
