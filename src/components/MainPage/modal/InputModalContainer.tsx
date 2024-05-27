import type React from "react";
import { useState, useCallback } from "react";
import dayjs from "dayjs";
import { useValidation } from "../../../hooks/useValidation";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import type { Schedule } from "../../../types/types";
import type { Dayjs } from "dayjs";
import { InputModalPresentational } from "./InputModalPresentational";
import { useSetRecoilState } from "recoil";
import { isShowModalAtom, savedScheduleSelector } from "~/globalState/states";

type Props = {
  selectedDay: Dayjs | null;
  selectedSchedule: Schedule | null;
};

export const InputModalContainer = ({
  selectedDay,
  selectedSchedule,
}: Props) => {
  const setIsShowModal = useSetRecoilState(isShowModalAtom);
  const setSaveSchedule = useSetRecoilState(savedScheduleSelector);

  // 今日の日付を取得
  const today = dayjs();

  // スケジュールの内容 selectedScheduleがtrueならば初期値にイベントの中身を、falseなら空
  const [title, setTitle] = useState<string>(
    selectedSchedule ? selectedSchedule.title : ""
  );
  const [date, setDate] = useState<Dayjs | null>(
    selectedSchedule ? selectedSchedule.date : selectedDay ? selectedDay : today
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
  const handleOutOfModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget &&
        setIsShowModal((modal) => ({
          ...modal,
          ...{ isShowInputModal: false },
        }));
    },
    [setIsShowModal]
  );

  // 削除ボタン押下時
  const handleTrashButtonClick = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }

    // ローカルストレージへの削除処理を行う
    setSaveSchedule({
      savedSchedules: [],
      type: "delete",
      payload: selectedSchedule,
    });
    setIsShowModal((modal) => ({
      ...modal,
      ...{ isShowInputModal: false },
    }));
  }, [selectedSchedule, setIsShowModal, setSaveSchedule]);

  // ×ボタン押下時
  const handleCloseButtonClick = useCallback(() => {
    // 入力モーダルを閉じる
    setIsShowModal((modal) => ({
      ...modal,
      ...{ isShowInputModal: false },
    }));
  }, [setIsShowModal]);

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

  // エラーなしならundefinedを返す
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
      // ローカルストレージへの編集処理
      setSaveSchedule({
        savedSchedules: [],
        type: "update",
        payload: enteredSchedule,
      });

      // 入力モーダルを閉じる
      setIsShowModal((modal) => ({
        ...modal,
        ...{ isShowInputModal: false },
      }));
    } else {
      // ローカルストレージへの追加処理
      setSaveSchedule({
        savedSchedules: [],
        type: "push",
        payload: enteredSchedule,
      });

      // 入力モーダルを閉じる
      setIsShowModal((modal) => ({
        ...modal,
        ...{ isShowInputModal: false },
      }));
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
    setSaveSchedule,
    setIsShowModal,
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
