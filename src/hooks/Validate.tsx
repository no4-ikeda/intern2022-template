import dayjs from "dayjs";
import type { ValidateProps } from "~/types/types";

export default function Validate({
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
}: ValidateProps) {
  // エラーメッセージ付与
  if (calendarEvent.title == "") {
    // setTitleError("empty");
    titleEmpty();
  } else if (calendarEvent.title.length > 10) {
    // setTitleError("length");
    titleOverFlow();
  } else {
    validTitle();
  }
  if (dayjs(calendarEvent.date, "YYYY-MM-DD", true).isValid() == false) {
    invalidDate();
  } else {
    validDate();
  }
  if (calendarEvent.startTime == "") {
    startTimeEmpty();
  } else {
    validStartTime();
  }
  if (calendarEvent.endTime == "") {
    endTimeEmpty();
  } else {
    validEndTime();
  }
  if (calendarEvent.memo.length > 255) {
    memoOvarFlow();
  } else {
    validMemo();
  }
}
