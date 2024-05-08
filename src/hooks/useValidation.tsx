import dayjs from "dayjs";
import type { ScheduleEnteredProps } from "../types/types";

export default function Validate(props: ScheduleEnteredProps) {
  const errorMessage: ScheduleEnteredProps = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    memo: "",
  };

  // エラーメッセージ付与
  if (props.title == "") {
    errorMessage.title = "予定は必須項目です";
  } else if (props.title.length > 10) {
    errorMessage.title = "予定は１０文字以下で入力してください";
  }
  if (dayjs(props.date, "YYYY-MM-DD", true).isValid() == false) {
    errorMessage.date = "有効な日付を入力してください";
  }
  if (props.startTime == "") {
    errorMessage.startTime = "開始時刻は必須項目です";
  }
  if (props.endTime == "") {
    errorMessage.endTime = "終了時刻は必須項目です";
  }
  if (props.memo.length > 255) {
    errorMessage.memo = "メモは２５５文字以内で入力してください";
  }

  // スタイル変更のためのID取得
  const titleStyle = document.getElementById("title");
  const dateStyle = document.getElementById("date");
  const startTimeStyle = document.getElementById("startTime");
  const endTimeStyle = document.getElementById("endTime");
  const memoStyle = document.getElementById("memo");
  const titleError = document.getElementById("titleError");
  const dateError = document.getElementById("dateError");
  const startTimeError = document.getElementById("startTimeError");
  const endTimeError = document.getElementById("endTimeError");
  const memoError = document.getElementById("memoError");
  const titleErrorMessage = document.getElementById("titleErrorMessage");
  const dateErrorMessage = document.getElementById("dateErrorMessage");
  const startTimeErrorMessage = document.getElementById(
    "startTimeErrorMessage"
  );
  const endTimeErrorMessage = document.getElementById("endTimeErrorMessage");
  const memoErrorMessage = document.getElementById("memoErrorMessage");

  // nullReturn
  if (
    titleStyle == null ||
    dateStyle == null ||
    startTimeStyle == null ||
    endTimeStyle == null ||
    memoStyle == null ||
    titleError == null ||
    dateError == null ||
    startTimeError == null ||
    endTimeError == null ||
    memoError == null ||
    titleErrorMessage == null ||
    dateErrorMessage == null ||
    startTimeErrorMessage == null ||
    endTimeErrorMessage == null ||
    memoErrorMessage == null
  ) {
    return false;
  }

  // バリデーションエラー時にスタイルを変更する
  if (errorMessage.title != "") {
    titleStyle.style.border = "1px solid #ff0000";
    titleError.style.display = "flex";
    titleErrorMessage.innerHTML = errorMessage.title;
  } else {
    titleStyle.style.border = "1px solid #000000";
    titleError.style.display = "none";
  }
  if (errorMessage.date != "") {
    dateStyle.style.border = "1px solid #ff0000";
    dateError.style.display = "flex";
    dateErrorMessage.innerHTML = errorMessage.date;
  } else {
    dateStyle.style.border = "1px solid #000000";
    dateError.style.display = "none";
  }
  if (errorMessage.startTime != "") {
    startTimeStyle.style.border = "1px solid #ff0000";
    startTimeError.style.display = "flex";
    startTimeErrorMessage.innerHTML = errorMessage.startTime;
  } else {
    startTimeStyle.style.border = "1px solid #000000";
    startTimeError.style.display = "none";
  }
  if (errorMessage.endTime != "") {
    endTimeStyle.style.border = "1px solid #ff0000";
    endTimeError.style.display = "flex";
    endTimeErrorMessage.innerHTML = errorMessage.endTime;
  } else {
    endTimeStyle.style.border = "1px solid #000000";
    endTimeError.style.display = "none";
  }
  if (errorMessage.memo != "") {
    memoStyle.style.border = "1px solid #ff0000";
    memoError.style.display = "flex";
    memoErrorMessage.innerHTML = errorMessage.memo;
  } else {
    memoStyle.style.border = "1px solid #000000";
    memoError.style.display = "none";
  }

  // エラーが何もなかったらTrueを返す
  if (
    errorMessage.title == "" &&
    errorMessage.date == "" &&
    errorMessage.startTime == "" &&
    errorMessage.endTime == "" &&
    errorMessage.memo == ""
  ) {
    return true;
  } else {
    return false;
  }
}
