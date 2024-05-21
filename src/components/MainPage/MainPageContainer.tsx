import { useCallback, useContext, useState } from "react";
import YearMonthContext from "../../contexts/YearMonthContext";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Schedule } from "../../types/types";
import useFetchHolidayList from "../../hooks/useFetchHolidayList";
import MainPagePresentational from "./MainPagePresentational";

export default function MainPageContainer() {
  const {
    isShowCreateNewModal,
    setIsShowCreateNewModal,
    isShowEditModal,
    isShowDetailModal,
    setIsShowDetailModal,
    isShowHolidayModal,
    setIsShowHolidayModal,
  } = useContext(YearMonthContext);

  // 現在ページに表示されている月
  const [currentPageYear, setCurrentPageYear] = useState<number>(
    dayjs().year()
  );
  // dayjsは月を0~11でとってくる
  const [currentPageMonth, setCurrentPageMonth] = useState<number>(
    dayjs().month()
  );
  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  // 次月、前月ボタンを押したとき
  const handleBackMonthButtonClick = () => {
    if (currentPageMonth > 0) {
      setCurrentPageMonth((month) => month - 1);
    } else {
      setCurrentPageMonth(11);
      setCurrentPageYear((year) => year - 1);
    }
  };
  const handleNextMonthButtonClick = () => {
    if (currentPageMonth < 10) {
      setCurrentPageMonth((month) => month + 1);
    } else {
      setCurrentPageMonth(0);
      setCurrentPageYear((year) => year + 1);
    }
  };

  // 祝日を取得
  useFetchHolidayList(currentPageYear);

  // 日付のセルが押されたとき
  const handleCreateNewClick = useCallback(
    (date: Dayjs) => {
      setSelectedDay(date);
      setIsShowCreateNewModal(true);
    },
    [setIsShowCreateNewModal]
  );

  // 祝日がクリックされたとき
  const handleHolidayClick = useCallback(
    (date: dayjs.Dayjs) => {
      setIsShowHolidayModal(true);
      setSelectedDay(date);
    },
    [setIsShowHolidayModal]
  );

  // 予定がクリックされたとき
  const handleScheduleClick = useCallback(
    (schedule: Schedule) => {
      setSelectedSchedule(schedule);
      setIsShowDetailModal(true);
    },
    [setIsShowDetailModal]
  );

  return (
    <MainPagePresentational
      onBackMonthButtonClick={handleBackMonthButtonClick}
      onNextMonthButtonClick={handleNextMonthButtonClick}
      onCreateNewClick={handleCreateNewClick}
      onHolidayClick={handleHolidayClick}
      onScheduleClick={handleScheduleClick}
      isShowCreateNewModal={isShowCreateNewModal}
      isShowEditModal={isShowEditModal}
      isShowDetailModal={isShowDetailModal}
      isShowHolidayModal={isShowHolidayModal}
      selectedDay={selectedDay}
      selectedSchedule={selectedSchedule}
      currentPageYear={currentPageYear}
      currentPageMonth={currentPageMonth}
    />
  );
}
