import { useCallback, useContext } from "react";
import { useState } from "react";
import { useDateMatrix } from "./hooks/useDateMatrix";
import { Month } from "./Month";
import CalenderHeader from "./CalenderHeader";
import YearMonthContext from "./context/Context";
import CreateNewModalContainer from "./CreateNewModalContainer";
import EditModalContainer from "./EditModalContainer";
import DetailModalContainer from "./DetailModalContainer";
import HolidayModalContainer from "./HolidayModalContainer";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Schedule } from "./types/types";
import useFetchHoliday from "./hooks/useFetchHoliday";

export default function App() {
  const {
    isShowCreateNewModal,
    setIsShowCreateNewModal,
    isShowEditModal,
    setIsShowEditModal,
    isShowDetailModal,
    setIsShowDetailModal,
    isShowHolidayModal,
    setIsShowHolidayModal,
    dispatchCalEvent,
  } = useContext(YearMonthContext);

  // 現在ページに表示されている月 0~11
  const [currentPageMonth, setCurrentPageMonth] = useState<number>(
    dayjs().month()
  );
  const [selectedDay, setselectedDay] = useState<Dayjs>(dayjs());
  const [selectedSchedule, setselectedSchedule] = useState<Schedule | null>(
    null
  );

  // 次月、前月ボタンを押したとき
  const handleBackMonth = () => {
    setCurrentPageMonth((currentPageMonth) => currentPageMonth - 1);
  };
  const handelNextMonth = () => {
    setCurrentPageMonth((currentPageMonth) => currentPageMonth + 1);
  };

  // 祝日を取得
  void useFetchHoliday(
    dayjs(new Date(dayjs().year(), currentPageMonth)).year()
  );

  // 一月分の日付配列を取得
  const dateMatrix = useDateMatrix(currentPageMonth);

  // 日付のセルが押されたとき
  const handleClickCreateNew = useCallback(
    (date: Dayjs) => {
      setselectedDay(date);
      setIsShowCreateNewModal(true);
    },
    [setIsShowCreateNewModal]
  );

  // 祝日がクリックされたとき
  const handleClickHoliday = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, date: dayjs.Dayjs) => {
      setIsShowHolidayModal(true);
      setselectedDay(date);
      e.stopPropagation();
    },
    [setIsShowHolidayModal]
  );

  // 予定がクリックされたとき
  const handleClickEvent = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, event: Schedule) => {
      setselectedSchedule(event);
      setIsShowDetailModal(true);
      e.stopPropagation();
    },
    [setIsShowDetailModal]
  );

  //入力された値の妥当性チェック
  const handleClickSubmit = useCallback(
    (scheduleEntered: Schedule, selectedSchedule: Schedule | null = null) => {
      if (
        scheduleEntered.title !== "" &&
        scheduleEntered.title.length <= 10 &&
        dayjs(scheduleEntered.date, "YYYY-MM-DD", true).isValid() &&
        scheduleEntered.startTime !== "" &&
        scheduleEntered.endTime !== "" &&
        scheduleEntered.memo.length <= 255
      ) {
        // エラーメッセージが何もないときsubmit処理が行われる
        if (selectedSchedule) {
          dispatchCalEvent({ type: "update", payload: scheduleEntered });
          setIsShowEditModal(false);
        } else {
          dispatchCalEvent({ type: "push", payload: scheduleEntered });
          setIsShowEditModal(false);
          setIsShowCreateNewModal(false);
        }
      }
    },
    [dispatchCalEvent, setIsShowCreateNewModal, setIsShowEditModal]
  );

  return (
    <>
      {isShowCreateNewModal && (
        <CreateNewModalContainer handleClickSubmit={handleClickSubmit} />
      )}
      {isShowEditModal && (
        <EditModalContainer
          selectedSchedule={selectedSchedule}
          handleClickSubmit={handleClickSubmit}
        />
      )}
      {isShowDetailModal && (
        <DetailModalContainer selectedSchedule={selectedSchedule} />
      )}
      {isShowHolidayModal && (
        <HolidayModalContainer selectedDay={selectedDay} />
      )}
      <CalenderHeader
        handleBackMonth={handleBackMonth}
        handleNextMonth={handelNextMonth}
        currentPageMonth={currentPageMonth}
      />
      <Month
        currentPageMonth={currentPageMonth}
        dateMatrix={dateMatrix}
        handleClickCreateNew={handleClickCreateNew}
        handleClickHoliday={handleClickHoliday}
        handleClickEvent={handleClickEvent}
      />
    </>
  );
}
