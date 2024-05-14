import type React from "react";
import { useState, useContext, useCallback } from "react";
import YearMonthContext from "./context/Context";
import type { EditModalContainerProps } from "./types/types";
import EditModalPresenter from "./EditModalPresenter";
import dayjs from "dayjs";

export default function EditModalContainer({
  selectedSchedule,
  handleClickSubmit,
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
  const handleClickOutOfModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowEditModal(false);
    },
    [setIsShowEditModal]
  );

  // 削除、クローズボタンが押されたとき
  const handleClickTrash = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }
    dispatchCalEvent({ type: "delete", payload: selectedSchedule });
    setIsShowEditModal(false);
  }, [dispatchCalEvent, selectedSchedule, setIsShowEditModal]);

  const handleClickClose = useCallback(() => {
    setIsShowEditModal(false);
  }, [setIsShowEditModal]);

  // テキストボックスの値が変化したとき、Stateにセットされる
  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );
  const handleChangeDate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
    },
    []
  );
  const handleChangeStartTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartTime(e.target.value);
    },
    []
  );
  const handleChangeEndTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndTime(e.target.value);
    },
    []
  );
  const handleChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMemo(e.target.value);
    },
    []
  );

  if (selectedSchedule == null) {
    return null;
  }

  // 送信ボタンが押されたとき

  const handleSubmit = () => {
    const calendarSchedule = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: selectedSchedule ? selectedSchedule.id : Date.now(),
    };

    handleClickSubmit(calendarSchedule, selectedSchedule);
  };

  return (
    <EditModalPresenter
      handleClickOutOfModal={handleClickOutOfModal}
      handleSubmit={handleSubmit}
      handleClickTrash={handleClickTrash}
      handleClickClose={handleClickClose}
      handleChangeTitle={handleChangeTitle}
      handleChangeDate={handleChangeDate}
      handleChangeStartTime={handleChangeStartTime}
      handleChangeEndTime={handleChangeEndTime}
      handleChangeMemo={handleChangeMemo}
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
