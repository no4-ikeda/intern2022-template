import type React from "react";
import { useState, useContext, useCallback } from "react";
import YearMonthContext from "../../../contexts/YearMonthContext";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import CreateNewModalPresentational from "./CreateNewModalPresentational";
import type {
  DateError,
  EndTimeError,
  MemoError,
  Schedule,
  StartTimeError,
  TitleError,
} from "../../../types/types";
import { useValidation } from "../../../hooks/useValidation";
import useErrorMessage from "../../../hooks/useErrorMessage";

type Props = {
  selectedDay: Dayjs | null;
};
export default function CreateNewModalContainer({ selectedDay }: Props) {
  // 今日の日付を取得
  const today = dayjs();

  const { setIsShowCreateNewModal, dispatchCalSchedule } =
    useContext(YearMonthContext);

  // スケジュールの内容
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<Dayjs>(selectedDay ? selectedDay : today);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  // エラー内容
  const [titleError, setTitleError] = useState<TitleError | undefined>(
    undefined
  );
  const [dateError, setDateError] = useState<DateError | undefined>(undefined);
  const [startTimeError, setStartTimeError] = useState<
    StartTimeError | undefined
  >(undefined);
  const [endTimeError, setEndTimeError] = useState<EndTimeError | undefined>(
    undefined
  );
  const [memoError, setMemoError] = useState<MemoError | undefined>(undefined);

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
      e.target === e.currentTarget && setIsShowCreateNewModal(false);
    },
    [setIsShowCreateNewModal]
  );

  // ×ボタンが押されたとき
  const handleCloseButtonClick = useCallback(() => {
    setIsShowCreateNewModal(false);
  }, [setIsShowCreateNewModal]);

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
    const enteredSchedule: Schedule = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: Date.now(),
    };

    setTitleError(validateTitle(enteredSchedule.title));
    setDateError(validateDate(enteredSchedule.date));
    setStartTimeError(validateStartTime(enteredSchedule.startTime));
    setEndTimeError(validateEndTime(enteredSchedule.endTime));
    setMemoError(validateMemo(enteredSchedule.memo));
    if (
      !validateTitle(enteredSchedule.title) &&
      !validateDate(enteredSchedule.date) &&
      !validateStartTime(enteredSchedule.startTime) &&
      !validateEndTime(enteredSchedule.endTime) &&
      !validateMemo(enteredSchedule.memo)
    ) {
      // エラーがないとき
      dispatchCalSchedule({ type: "push", payload: enteredSchedule });
      setIsShowCreateNewModal(false);
    }
  };

  const [
    titleErrorMessage,
    dateErrorMessage,
    startTimeErrorMessage,
    endTimeErrorMessage,
    memoErrorMessage,
  ] = useErrorMessage({
    titleError,
    dateError,
    startTimeError,
    endTimeError,
    memoError,
  });

  return (
    <CreateNewModalPresentational
      date={date}
      today={today}
      titleErrorMessage={titleErrorMessage ? titleErrorMessage : ""}
      dateErrorMessage={dateErrorMessage ? dateErrorMessage : ""}
      startTimeErrorMessage={startTimeErrorMessage ? startTimeErrorMessage : ""}
      endTimeErrorMessage={endTimeErrorMessage ? endTimeErrorMessage : ""}
      memoErrorMessage={memoErrorMessage ? memoErrorMessage : ""}
      onOutOfModalClick={handleOutOfModalClick}
      onSaveButtonClick={handleSaveButtonClick}
      onCloseButtonClick={handleCloseButtonClick}
      onTitleChange={handleTitleChange}
      onDateChange={handleDateChange}
      onStartTimeChange={handleStartTimeChange}
      onEndTimeChange={handleEndTimeChange}
      onMemoChange={handleMemoChange}
    />
  );
}
