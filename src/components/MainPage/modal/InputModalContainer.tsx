import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { useValidation } from "../../../hooks/useValidation";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import type { Schedule } from "../../../types/types";
import type { Dayjs } from "dayjs";
import { InputModalPresentational } from "./InputModalPresentational";
import { useSchedules } from "~/hooks/useSchedules";

type Props = {
  selectedDay: Dayjs | null;
  selectedSchedule: Schedule | null;
  onRequestCloseInputModal: () => void;
};

export const InputModalContainer = ({
  selectedDay,
  selectedSchedule,
  onRequestCloseInputModal,
}: Props) => {
  const { addSchedule, updateSchedule, deleteSchedule } = useSchedules();

  // 今日の日付を取得
  const today = dayjs();

  // スケジュールの内容 selectedScheduleがtrueならば初期値にスケジュールの中身を、falseなら空
  const [title, setTitle] = useState<string>(
    selectedSchedule ? selectedSchedule.title : ""
  );
  const [date, setDate] = useState<Dayjs | null>(
    selectedSchedule ? selectedSchedule.date : selectedDay ? selectedDay : null
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

  // saveボタンが押されたか
  const [isSaveButtonClicked, setIsSaveButtonClicked] =
    useState<boolean>(false);

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(() => {
    onRequestCloseInputModal();
  }, [onRequestCloseInputModal]);

  // 削除ボタン押下時
  const handleTrashButtonClick = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }

    deleteSchedule(selectedSchedule);
    onRequestCloseInputModal();
  }, [selectedSchedule, deleteSchedule, onRequestCloseInputModal]);

  // ×ボタン押下時
  const handleCloseButtonClick = useCallback(() => {
    // 入力モーダルを閉じる
    onRequestCloseInputModal();
  }, [onRequestCloseInputModal]);

  // テキストボックスの値が変化したとき、Stateにセットされる
  const handleTitleChange = useCallback((title: string) => {
    setTitle(title);
  }, []);
  const handleDateChange = useCallback((date: string) => {
    setDate(dayjs(date));
  }, []);
  const handleStartTimeChange = useCallback((startTime: string) => {
    setStartTime(startTime);
  }, []);
  const handleEndTimeChange = useCallback((endTime: string) => {
    setEndTime(endTime);
  }, []);
  const handleMemoChange = useCallback((memo: string) => {
    setMemo(memo);
  }, []);

  // エラーの種類を返す、エラーなしならundefinedを返す
  const { titleError, dateError, startTimeError, endTimeError, memoError } =
    useValidation({ title, date, startTime, endTime, memo });

  // エラーメッセージ付与
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

  // 送信ボタンが押されたとき
  const handleSaveButtonClick = useCallback(() => {
    setIsSaveButtonClicked(true);

    // 入力されたスケジュール
    const enteredSchedule: Schedule = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: selectedSchedule ? selectedSchedule.id : Date.now(),
    };

    if (
      titleError ||
      dateError ||
      startTimeError ||
      endTimeError ||
      memoError
    ) {
      return;
    } else if (selectedSchedule) {
      updateSchedule(enteredSchedule);

      // 入力モーダルを閉じる
      onRequestCloseInputModal();
    } else {
      addSchedule(enteredSchedule);

      // 入力モーダルを閉じる
      onRequestCloseInputModal();
    }
  }, [
    title,
    date,
    startTime,
    endTime,
    memo,
    titleError,
    dateError,
    startTimeError,
    endTimeError,
    memoError,
    selectedSchedule,
    updateSchedule,
    onRequestCloseInputModal,
    addSchedule,
  ]);

  return (
    <InputModalPresentational
      today={today}
      title={title}
      date={date}
      startTime={startTime}
      endTime={endTime}
      memo={memo}
      titleErrorMessage={titleErrorMessage}
      dateErrorMessage={dateErrorMessage}
      startTimeErrorMessage={startTimeErrorMessage}
      endTimeErrorMessage={endTimeErrorMessage}
      memoErrorMessage={memoErrorMessage}
      isSaveButtonClicked={isSaveButtonClicked}
      selectedSchedule={selectedSchedule}
      onOutOfModalClick={handleOutOfModalClick}
      onSaveButtonClick={handleSaveButtonClick}
      onTrashButtonClick={handleTrashButtonClick}
      onCloseButtonClick={handleCloseButtonClick}
      onTitleChange={handleTitleChange}
      onDateChange={handleDateChange}
      onStartTimeChange={handleStartTimeChange}
      onEndTimeChange={handleEndTimeChange}
      onMemoChange={handleMemoChange}
    />
  );
};
