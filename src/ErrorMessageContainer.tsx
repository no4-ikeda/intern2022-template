import type {
  ValidateTitleProps,
  ValidateDateProps,
  ValidateStartTimeProps,
  ValidateEndTimeProps,
  ValidateMemoProps,
} from "~/types/types";
import {
  DateError,
  EndTimeError,
  MemoError,
  StartTimeError,
  TitleError,
} from "./ErrorMessagePresenter";

export function ValidateTitle({ titleError }: ValidateTitleProps) {
  let titleErrorMessage;

  if (titleError == "empty") {
    titleErrorMessage = "タイトルは必須項目です";
  } else if (titleError == "length") {
    titleErrorMessage = "タイトルは１０文字以内で入力してください";
  } else {
    titleErrorMessage = "";
  }

  return <TitleError titleErrorMessage={titleErrorMessage} />;
}

export function ValidateDate({ dateError }: ValidateDateProps) {
  let dateErrorMessage;
  if (dateError) {
    dateErrorMessage = "有効な日付を入力してください";
  } else {
    dateErrorMessage = "";
  }
  return <DateError dateErrorMessage={dateErrorMessage} />;
}
export function ValidateStartTime({ startTimeError }: ValidateStartTimeProps) {
  let startTimeErrorMessage;
  if (startTimeError) {
    startTimeErrorMessage = "開始時刻は必須項目です";
  } else {
    startTimeErrorMessage = "";
  }
  return <StartTimeError startTimeErrorMessage={startTimeErrorMessage} />;
}
export function ValidateEndTime({ endTimeError }: ValidateEndTimeProps) {
  let endTimeErrorMessage;

  if (endTimeError) {
    endTimeErrorMessage = "終了時刻は必須項目です";
  } else {
    endTimeErrorMessage = "";
  }
  return <EndTimeError endTimeErrorMessage={endTimeErrorMessage} />;
}
export function ValidateMemo({ memoError }: ValidateMemoProps) {
  let memoErrorMessage;
  if (memoError) {
    memoErrorMessage = "メモは２５５文字以内で入力してください";
  } else {
    memoErrorMessage = "";
  }
  return <MemoError memoErrorMessage={memoErrorMessage} />;
}
