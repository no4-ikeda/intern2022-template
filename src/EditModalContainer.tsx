import type React from "react";
import { useState, useContext, useCallback } from "react";
import YearMonthContext from "./context/YearMonthContext";
import type { EditModalContainerProps } from "./types/types";
import EditModalPresenter from "./EditModalPresenter";
import dayjs from "dayjs";

export default function EditModalContainer({
  selectedSchedule,
  handleSubmitClick,
  titleError,
  dateError,
  startTimeError,
  endTimeError,
  memoError,
}: EditModalContainerProps) {
  // 今日をYYYY-MM-DDで取ってくる
  const today = dayjs().format("YYYY-MM-DD");

  const { setIsShowEditModal, dispatchCalEvent } = useContext(YearMonthContext);

  // selectedScheduleがtrueならば初期値にイベントの中身を、falseなら空 */

  const [title, setTitle] = useState<string>(
    selectedSchedule ? selectedSchedule.title : ""
  );
  const [date, setDate] = useState<string>(
    selectedSchedule ? selectedSchedule.date : ""
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
    dispatchCalEvent({ type: "delete", payload: selectedSchedule });
    setIsShowEditModal(false);
  }, [dispatchCalEvent, selectedSchedule, setIsShowEditModal]);

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

  if (selectedSchedule == null) {
    return null;
  }

  // 送信ボタンが押されたとき

  const handleSaveButtonClick = () => {
    const calendarSchedule = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: selectedSchedule ? selectedSchedule.id : Date.now(),
    };

    handleSubmitClick(calendarSchedule, selectedSchedule);
  };

  return (
    <EditModalPresenter
      handleOutOfModalClick={handleOutOfModalClick}
      handleSaveButtonClick={handleSaveButtonClick}
      handleTrashButtonClick={handleTrashButtonClick}
      handleCloseButtonClick={handleCloseButtonClick}
      handleTitleChange={handleTitleChange}
      handleDateChange={handleDateChange}
      handleStartTimeChange={handleStartTimeChange}
      handleEndTimeChange={handleEndTimeChange}
      handleMemoChange={handleMemoChange}
      today={today}
      titleError={titleError}
      dateError={dateError}
      startTimeError={startTimeError}
      endTimeError={endTimeError}
      memoError={memoError}
      title={title}
      date={date}
      startTime={startTime}
      endTime={endTime}
      memo={memo}
    />
  );
}
