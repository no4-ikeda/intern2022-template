import type React from "react";
import { useState, useContext, useCallback } from "react";
import YearMonthContext from "./context/YearMonthContext";
import type { CreateNewModalContainerProps } from "./types/types";
import dayjs from "dayjs";
import CreateNewModalPresenter from "./CreateNewModalPresenter";

export default function CreateNewModalContainer({
  titleError,
  dateError,
  startTimeError,
  endTimeError,
  memoError,
  handleSubmitClick,
}: CreateNewModalContainerProps) {
  // 今日をYYYY-MM-DDで取ってくる
  const today = dayjs().format("YYYY-MM-DD");

  const { setIsShowCreateNewModal } = useContext(YearMonthContext);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  // 送信ボタンが押されたとき
  const handleSaveButtonClick = () => {
    const calendarSchedule = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: Date.now(),
    };

    handleSubmitClick(calendarSchedule);
  };

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
      setDate(e.target.value);
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
  return (
    <CreateNewModalPresenter
      handleOutOfModalClick={handleOutOfModalClick}
      handleSaveButtonClick={handleSaveButtonClick}
      handleCloseButtonClick={handleCloseButtonClick}
      handleTitleChange={handleTitleChange}
      handleDateChange={handleDateChange}
      handleStartTimeChange={handleStartTimeChange}
      handleEndTimeChange={handleEndTimeChange}
      handleMemoChange={handleMemoChange}
      date={date}
      today={today}
      titleError={titleError}
      dateError={dateError}
      startTimeError={startTimeError}
      endTimeError={endTimeError}
      memoError={memoError}
    />
  );
}
