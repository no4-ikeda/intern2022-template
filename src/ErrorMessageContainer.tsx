import type {
  ValidateTitleProps,
  ValidateDateProps,
  ValidateStartTimeProps,
  ValidateEndTimeProps,
  ValidateMemoProps,
} from "~/types/types";
import {
  DateErrorMessagePresenter,
  EndTimeErrorMessagePresenter,
  MemoErrorMessagePresenter,
  StartTimeErrorMessagePresenter,
  TitleErrorMessagePresenter,
} from "./ErrorMessagePresenter";

export function TitleErrorMessageContainer({ titleError }: ValidateTitleProps) {
  let titleErrorMessage;

  if (titleError == "empty") {
    titleErrorMessage = "タイトルは必須項目です";
  } else if (titleError == "length") {
    titleErrorMessage = "タイトルは１０文字以内で入力してください";
  } else {
    titleErrorMessage = "";
  }

  return <TitleErrorMessagePresenter titleErrorMessage={titleErrorMessage} />;
}

export function DateErrorMessageContainer({ dateError }: ValidateDateProps) {
  let dateErrorMessage;
  if (dateError) {
    dateErrorMessage = "有効な日付を入力してください";
  } else {
    dateErrorMessage = "";
  }
  return <DateErrorMessagePresenter dateErrorMessage={dateErrorMessage} />;
}
export function StartTimeErrorMessageContainer({
  startTimeError,
}: ValidateStartTimeProps) {
  let startTimeErrorMessage;
  if (startTimeError) {
    startTimeErrorMessage = "開始時刻は必須項目です";
  } else {
    startTimeErrorMessage = "";
  }
  return (
    <StartTimeErrorMessagePresenter
      startTimeErrorMessage={startTimeErrorMessage}
    />
  );
}
export function EndTimeErrorMessageContainer({
  endTimeError,
}: ValidateEndTimeProps) {
  let endTimeErrorMessage;

  if (endTimeError) {
    endTimeErrorMessage = "終了時刻は必須項目です";
  } else {
    endTimeErrorMessage = "";
  }
  return (
    <EndTimeErrorMessagePresenter endTimeErrorMessage={endTimeErrorMessage} />
  );
}
export function MemoErrorMessageContainer({ memoError }: ValidateMemoProps) {
  let memoErrorMessage;
  if (memoError) {
    memoErrorMessage = "メモは２５５文字以内で入力してください";
  } else {
    memoErrorMessage = "";
  }
  return <MemoErrorMessagePresenter memoErrorMessage={memoErrorMessage} />;
}
