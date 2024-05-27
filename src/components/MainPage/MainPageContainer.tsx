import { useCallback, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Schedule } from "../../types/types";
import { useFetchHolidayList } from "../../hooks/useFetchHolidayList";
import { MainPagePresentational } from "./MainPagePresentational";
import { useSetRecoilState } from "recoil";
import { isShowModalAtom } from "~/globalState/states";

export const MainPageContainer = () => {
  const setIsShowModal = useSetRecoilState(isShowModalAtom);

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

  // 祝日を取得
  useFetchHolidayList(currentPageYear);

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

  // 日付のセルが押されたとき
  const handleCreateNewClick = useCallback(
    (date: Dayjs) => {
      setSelectedDay(date);

      // 入力モーダルを開く
      setIsShowModal((modal) => ({
        ...modal,
        ...{ isShowInputModal: true },
      }));
      setSelectedSchedule(null);
    },
    [setIsShowModal]
  );

  // 祝日がクリックされたとき
  const handleHolidayClick = useCallback(
    (date: dayjs.Dayjs) => {
      // 祝日モーダルを開く
      setIsShowModal((modal) => ({
        ...modal,
        ...{ isShowHolidayModal: true },
      }));
      setSelectedDay(date);
    },
    [setIsShowModal]
  );

  // 予定がクリックされたとき
  const handleScheduleClick = useCallback(
    (schedule: Schedule) => {
      setSelectedSchedule(schedule);

      // 詳細モーダルを開く
      setIsShowModal((modal) => ({
        ...modal,
        ...{ isShowDetailModal: true },
      }));
    },
    [setIsShowModal]
  );

  return (
    <MainPagePresentational
      selectedDay={selectedDay}
      selectedSchedule={selectedSchedule}
      currentPageYear={currentPageYear}
      currentPageMonth={currentPageMonth}
      onBackMonthButtonClick={handleBackMonthButtonClick}
      onNextMonthButtonClick={handleNextMonthButtonClick}
      onCreateNewClick={handleCreateNewClick}
      onHolidayClick={handleHolidayClick}
      onScheduleClick={handleScheduleClick}
    />
  );
};
