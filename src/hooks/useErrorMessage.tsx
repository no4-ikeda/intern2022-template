import { useEffect, useState } from "react";
import type {
  DateError,
  EndTimeError,
  MemoError,
  StartTimeError,
  TitleError,
} from "~/types/types";

type UseErrorMessageProps = {
  titleError: TitleError | undefined;
  dateError: DateError | undefined;
  startTimeError: StartTimeError | undefined;
  endTimeError: EndTimeError | undefined;
  memoError: MemoError | undefined;
};
export default function useErrorMessage({
  titleError,
  dateError,
  startTimeError,
  endTimeError,
  memoError,
}: UseErrorMessageProps) {
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");
  const [dateErrorMessage, setDateErrorMessage] = useState<string>("");
  const [startTimeErrorMessage, setStartTimeErrorMessage] =
    useState<string>("");
  const [endTimeErrorMessage, setEndTimeErrorMessage] = useState<string>("");
  const [memoErrorMessage, setMemoErrorMessage] = useState<string>("");

  useEffect(() => {
    if (titleError == "empty") {
      setTitleErrorMessage("タイトルは必須項目です");
    } else if (titleError == "length") {
      setTitleErrorMessage("タイトルは１０文字以内で入力してください");
    } else {
      setTitleErrorMessage("");
    }

    if (dateError) {
      setDateErrorMessage("有効な日付を入力してください");
    } else {
      setDateErrorMessage("");
    }

    if (startTimeError) {
      setStartTimeErrorMessage("開始時刻は必須項目です");
    } else {
      setStartTimeErrorMessage("");
    }

    if (endTimeError) {
      setEndTimeErrorMessage("終了時刻は必須項目です");
    } else {
      setEndTimeErrorMessage("");
    }

    if (memoError) {
      setMemoErrorMessage("メモは２５５文字以内で入力してください");
    } else {
      setMemoErrorMessage("");
    }
  }, [dateError, endTimeError, memoError, startTimeError, titleError]);

  return {
    titleErrorMessage,
    dateErrorMessage,
    startTimeErrorMessage,
    endTimeErrorMessage,
    memoErrorMessage,
  };
}
