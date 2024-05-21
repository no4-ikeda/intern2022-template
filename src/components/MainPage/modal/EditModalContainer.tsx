import type React from "react";
import { useState, useContext, useCallback } from "react";
import YearMonthContext from "../../../contexts/YearMonthContext";
import type {
  DateError,
  EndTimeError,
  MemoError,
  Schedule,
  StartTimeError,
  TitleError,
} from "../../../types/types";
import EditModalPresentational from "./EditModalPresentational";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import useErrorMessage from "../../../hooks/useErrorMessage";
import { useValidation } from "../../../hooks/useValidation";

type EditModalContainerProps = {
  selectedSchedule: Schedule | null;
};

export default function EditModalContainer({
  selectedSchedule,
}: EditModalContainerProps) {
  const today = dayjs();
  const { setIsShowEditModal, dispatchCalSchedule } =
    useContext(YearMonthContext);

  // selectedScheduleがtrueならば初期値にイベントの中身を、falseなら空 */
  const [title, setTitle] = useState<string>(
    selectedSchedule ? selectedSchedule.title : ""
  );
  const [date, setDate] = useState<Dayjs>(
    selectedSchedule ? selectedSchedule.date : today
  );
  const [startTime, setStartTime] = useState<string>(
    selectedSchedule ? selectedSchedule.startTime : ""
  );
  const [endTime, setEndTime] = useState<string>(
    selectedSchedule ? selectedSchedule.endTime : ""
  );
  const [memo, setMemo] = useState<string>(
    selectedSchedule ? selectedSchedule.memo : ""
  );

  // エラー内容
  const [titleError, setTitleError] = useState<TitleError | undefined>();
  const [dateError, setDateError] = useState<DateError | undefined>();
  const [startTimeError, setStartTimeError] = useState<
    StartTimeError | undefined
  >();
  const [endTimeError, setEndTimeError] = useState<EndTimeError | undefined>();
  const [memoError, setMemoError] = useState<MemoError | undefined>();

  const {
    validateTitle,
    validateDate,
    validateStartTime,
    validateEndTime,
    validateMemo,
  } = useValidation();

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowEditModal(false);
    },
    [setIsShowEditModal]
  );

  // 削除、クローズボタンが押されたとき
  const handleTrashButtonClick = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }
    dispatchCalSchedule({ type: "delete", payload: selectedSchedule });
    setIsShowEditModal(false);
  }, [dispatchCalSchedule, selectedSchedule, setIsShowEditModal]);

  const handleCloseButtonClick = useCallback(() => {
    setIsShowEditModal(false);
  }, [setIsShowEditModal]);

  // テキストボックスの値が変化したとき、Stateにセットされる
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );
  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(dayjs(e.target.value));
    },
    []
  );
  const handleStartTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartTime(e.target.value);
    },
    []
  );
  const handleEndTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndTime(e.target.value);
    },
    []
  );
  const handleMemoChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMemo(e.target.value);
    },
    []
  );

  // 送信ボタンが押されたとき
  const handleSaveButtonClick = () => {
    // 入力されたスケジュール
    const enteredSchedule = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: selectedSchedule ? selectedSchedule.id : Date.now(),
    };

    setTitleError(validateTitle(enteredSchedule.title));
    setDateError(validateDate(enteredSchedule.date));
    setStartTimeError(validateStartTime(enteredSchedule.startTime));
    setEndTimeError(validateEndTime(enteredSchedule.endTime));
    setMemoError(validateMemo(enteredSchedule.memo));

    if (
      enteredSchedule.title !== "" &&
      enteredSchedule.title.length <= 10 &&
      dayjs(enteredSchedule.date, "YYYY-MM-DD", true).isValid() &&
      enteredSchedule.startTime !== "" &&
      enteredSchedule.endTime !== "" &&
      enteredSchedule.memo.length <= 255
    ) {
      // エラーがないとき
      if (selectedSchedule) {
        dispatchCalSchedule({ type: "update", payload: enteredSchedule });
        setIsShowEditModal(false);
      } else {
        dispatchCalSchedule({ type: "push", payload: enteredSchedule });
        setIsShowEditModal(false);
      }
    }
  };
  const {
    titleErrorMessage,
    dateErrorMessage,
    startTimeErrorMessage,
    endTimeErrorMessage,
    memoErrorMessage,
  } = useErrorMessage({
    titleError,
    dateError,
    startTimeError,
    endTimeError,
    memoError,
  });

  return (
    <EditModalPresentational
      onOutOfModalClick={handleOutOfModalClick}
      onSaveButtonClick={handleSaveButtonClick}
      onTrashButtonClick={handleTrashButtonClick}
      onCloseButtonClick={handleCloseButtonClick}
      onTitleChange={handleTitleChange}
      onDateChange={handleDateChange}
      onStartTimeChange={handleStartTimeChange}
      onEndTimeChange={handleEndTimeChange}
      onMemoChange={handleMemoChange}
      today={today}
      titleErrorMessage={titleErrorMessage}
      dateErrorMessage={dateErrorMessage}
      startTimeErrorMessage={startTimeErrorMessage}
      endTimeErrorMessage={endTimeErrorMessage}
      memoErrorMessage={memoErrorMessage}
      title={title}
      date={date}
      startTime={startTime}
      endTime={endTime}
      memo={memo}
    />
  );
}
