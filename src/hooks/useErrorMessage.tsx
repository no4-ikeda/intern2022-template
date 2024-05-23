import { useMemo } from "react";
import type {
  DateError,
  EndTimeError,
  MemoError,
  StartTimeError,
  TitleError,
} from "~/types/types";

type Props = {
  titleError: TitleError | undefined;
  dateError: DateError | undefined;
  startTimeError: StartTimeError | undefined;
  endTimeError: EndTimeError | undefined;
  memoError: MemoError | undefined;
};

export const useErrorMessage = ({
  titleError,
  dateError,
  startTimeError,
  endTimeError,
  memoError,
}: Props) => {
  const errorMessage = useMemo(() => {
    let titleErrorMessage,
      dateErrorMessage,
      startTimeErrorMessage,
      endTimeErrorMessage,
      memoErrorMessage;

    if (titleError == "empty") {
      titleErrorMessage = "タイトルは必須項目です";
    } else if (titleError == "length") {
      titleErrorMessage = "タイトルは１０文字以内で入力してください";
    } else {
      titleErrorMessage = "";
    }

    if (dateError) {
      dateErrorMessage = "有効な日付を入力してください";
    } else {
      dateErrorMessage = "";
    }

    if (startTimeError) {
      startTimeErrorMessage = "開始時刻は必須項目です";
    } else {
      startTimeErrorMessage = "";
    }

    if (endTimeError) {
      endTimeErrorMessage = "終了時刻は必須項目です";
    } else {
      endTimeErrorMessage = "";
    }

    if (memoError) {
      memoErrorMessage = "メモは２５５文字以内で入力してください";
    } else {
      memoErrorMessage = "";
    }
    return [
      titleErrorMessage,
      dateErrorMessage,
      startTimeErrorMessage,
      endTimeErrorMessage,
      memoErrorMessage,
    ];
  }, [dateError, endTimeError, memoError, startTimeError, titleError]);

  return errorMessage;
};
