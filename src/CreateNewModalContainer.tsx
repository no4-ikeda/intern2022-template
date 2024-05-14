import type React from "react";
import { useState, useContext, useCallback } from "react";
import YearMonthContext from "./context/Context";
import type { CreateNewModalContainerProps } from "./types/types";
import Validate from "./hooks/Validate";
import dayjs from "dayjs";
import CreateNewModalPresenter from "./CreateNewModalPresenter";

export default function CreateNewModalContainer({
  handleClickSubmit,
}: CreateNewModalContainerProps) {
  const [errorMessageTitle, setErrorMessageTitle] = useState<string>("");
  const [errorMessageDate, setErrorMessageDate] = useState<string>("");
  const [errorMessageStartTime, setErrorMessageStartTime] =
    useState<string>("");
  const [errorMessageEndTime, setErrorMessageEndTime] = useState<string>("");
  const [errorMessageMemo, setErrorMessageMemo] = useState<string>("");

  // 今日をYYYY-MM-DDで取ってくる
  const today = dayjs().format("YYYY-MM-DD");

  const { setIsShowCreateNewModal } = useContext(YearMonthContext);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  // 送信ボタンが押されたとき
  const handleSubmit = () => {
    const calendarEvent = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: Date.now(),
    };

    // type TitleError = "empty" | "length";

    // const[(titleError, setTitleError)] = useState<TitleError | undefined>();

    const titleEmpty = () => {
      setErrorMessageTitle("タイトルは必須項目です");
    };
    const titleOverFlow = () => {
      setErrorMessageTitle("予定は１０文字以下で入力してください");
    };
    const validTitle = () => {
      setErrorMessageTitle("");
    };
    const invalidDate = () => {
      setErrorMessageDate("有効な日付を入力してください");
    };
    const validDate = () => {
      setErrorMessageDate("");
    };
    const startTimeEmpty = () => {
      setErrorMessageStartTime("開始時刻は必須項目です");
    };
    const validStartTime = () => {
      setErrorMessageStartTime("");
    };
    const endTimeEmpty = () => {
      setErrorMessageEndTime("終了時刻は必須項目です");
    };
    const validEndTime = () => {
      setErrorMessageEndTime("");
    };
    const memoOvarFlow = () => {
      setErrorMessageMemo("メモは２５５文字以内で入力してください");
    };
    const validMemo = () => {
      setErrorMessageMemo("");
    };
    void Validate({
      calendarEvent,
      titleEmpty,
      titleOverFlow,
      validTitle,
      invalidDate,
      validDate,
      startTimeEmpty,
      validStartTime,
      endTimeEmpty,
      validEndTime,
      memoOvarFlow,
      validMemo,
    });

    handleClickSubmit(calendarEvent);
  };

  // const titleErrorMessage = useMemo(() => {
  //   return titleError === "empty" ? "タイトルは必須項目です" : "";
  // });

  // モーダルの外側を押したときモーダルを消す
  const handleClickOutOfModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowCreateNewModal(false);
    },
    [setIsShowCreateNewModal]
  );

  // ×ボタンが押されたとき
  const handleClickClose = useCallback(() => {
    setIsShowCreateNewModal(false);
  }, [setIsShowCreateNewModal]);

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
  return (
    <CreateNewModalPresenter
      handleClickOutOfModal={handleClickOutOfModal}
      handleSubmit={handleSubmit}
      handleClickClose={handleClickClose}
      handleChangeTitle={handleChangeTitle}
      handleChangeDate={handleChangeDate}
      handleChangeStartTime={handleChangeStartTime}
      handleChangeEndTime={handleChangeEndTime}
      handleChangeMemo={handleChangeMemo}
      date={date}
      today={today}
      errorMessageTitle={errorMessageTitle}
      errorMessageDate={errorMessageDate}
      errorMessageStartTime={errorMessageStartTime}
      errorMessageEndTime={errorMessageEndTime}
      errorMessageMemo={errorMessageMemo}
    />
  );
}
