import { useCallback, useContext, useState } from "react";
import { useDateMatrix } from "./hooks/useDateMatrix";
import { Month } from "./Month";
import CalenderHeader from "./CalenderHeader";
import YearMonthContext from "./context/YearMonthContext";
import CreateNewModalContainer from "./CreateNewModalContainer";
import EditModalContainer from "./EditModalContainer";
import DetailModalContainer from "./DetailModalContainer";
import HolidayModalContainer from "./HolidayModalContainer";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type {
  Schedule,
  DateError,
  EndTimeError,
  MemoError,
  StartTimeError,
  TitleError,
} from "./types/types";
import useFetchHoliday from "./hooks/useFetchHoliday";

export default function MainPage() {
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

  // 現在ページに表示されている月
  // currentPageMonthは1~12ではなく、マイナスや12以上の値が入りdayjsの機能で前年、翌年に対応している
  const [currentPageMonth, setCurrentPageMonth] = useState<number>(
    dayjs().month()
  );
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  // 次月、前月ボタンを押したとき
  const handleBackMonthButtonClick = () => {
    setCurrentPageMonth((currentPageMonth) => currentPageMonth - 1);
  };
  const handelNextMonthButtonClick = () => {
    setCurrentPageMonth((currentPageMonth) => currentPageMonth + 1);
  };

  // 祝日を取得
  void useFetchHoliday(
    dayjs(new Date(dayjs().year(), currentPageMonth)).year()
  );

  // 一月分の日付配列を取得
  const dateMatrix = useDateMatrix(currentPageMonth);

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
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, date: dayjs.Dayjs) => {
      setIsShowHolidayModal(true);
      setSelectedDay(date);
      e.stopPropagation();
    },
    [setIsShowHolidayModal]
  );

  // 予定がクリックされたとき
  const handleScheduleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>, event: Schedule) => {
      setSelectedSchedule(event);
      setIsShowDetailModal(true);
      e.stopPropagation();
    },
    [setIsShowDetailModal]
  );

  // エラーメッセージの有無
  const [titleError, setTitleError] = useState<TitleError | undefined>();
  const [dateError, setDateError] = useState<DateError | undefined>();
  const [startTimeError, setStartTimeError] = useState<
    StartTimeError | undefined
  >();
  const [endTimeError, setEndTimeError] = useState<EndTimeError | undefined>();
  const [memoError, setMemoError] = useState<MemoError | undefined>();

  //入力された値の妥当性チェック
  const handleSubmitClick = useCallback(
    (enteredSchedule: Schedule, selectedSchedule: Schedule | null = null) => {
      if (enteredSchedule.title == "") {
        setTitleError("empty");
      } else if (enteredSchedule.title.length > 10) {
        setTitleError("length");
      } else {
        setTitleError(undefined);
      }

      if (dayjs(enteredSchedule.date, "YYYY-MM-DD", true).isValid()) {
        setDateError(undefined);
      } else {
        setDateError("invalid");
      }

      if (enteredSchedule.startTime == "") {
        setStartTimeError("empty");
      } else {
        setStartTimeError(undefined);
      }

      if (enteredSchedule.endTime == "") {
        setEndTimeError("empty");
      } else {
        setEndTimeError(undefined);
      }

      if (enteredSchedule.memo.length > 255) {
        setMemoError("length");
      } else {
        setMemoError(undefined);
      }

      if (
        enteredSchedule.title !== "" &&
        enteredSchedule.title.length <= 10 &&
        dayjs(enteredSchedule.date, "YYYY-MM-DD", true).isValid() &&
        enteredSchedule.startTime !== "" &&
        enteredSchedule.endTime !== "" &&
        enteredSchedule.memo.length <= 255
      ) {
        // エラーメッセージが何もないときsubmit処理が行われる
        if (selectedSchedule) {
          dispatchCalEvent({ type: "update", payload: enteredSchedule });
          setIsShowEditModal(false);
        } else {
          dispatchCalEvent({ type: "push", payload: enteredSchedule });
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
        <CreateNewModalContainer
          handleSubmitClick={handleSubmitClick}
          titleError={titleError}
          dateError={dateError}
          startTimeError={startTimeError}
          endTimeError={endTimeError}
          memoError={memoError}
        />
      )}
      {isShowEditModal && (
        <EditModalContainer
          selectedSchedule={selectedSchedule}
          handleSubmitClick={handleSubmitClick}
          titleError={titleError}
          dateError={dateError}
          startTimeError={startTimeError}
          endTimeError={endTimeError}
          memoError={memoError}
        />
      )}
      {isShowDetailModal && (
        <DetailModalContainer selectedSchedule={selectedSchedule} />
      )}
      {isShowHolidayModal && (
        <HolidayModalContainer selectedDay={selectedDay} />
      )}
      <CalenderHeader
        handleBackMonthButtonClick={handleBackMonthButtonClick}
        handleNextMonthButtonClick={handelNextMonthButtonClick}
        currentPageMonth={currentPageMonth}
      />
      <Month
        currentPageMonth={currentPageMonth}
        dateMatrix={dateMatrix}
        handleCreateNewClick={handleCreateNewClick}
        handleHolidayClick={handleHolidayClick}
        handleScheduleClick={handleScheduleClick}
      />
    </>
  );
}
