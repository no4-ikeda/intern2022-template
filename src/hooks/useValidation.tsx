import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type {
  TitleError,
  DateError,
  StartTimeError,
  EndTimeError,
  MemoError,
} from "../types/types";

export function useValidation() {
  const validateTitle = (title: string): TitleError | undefined => {
    if (title == "") {
      return "empty";
    } else if (title.length > 10) {
      return "length";
    } else {
      return undefined;
    }
  };
  const validateDate = (date: Dayjs): DateError | undefined => {
    if (dayjs(date, "YYYY-MM-DD", true).isValid()) {
      return undefined;
    } else {
      return "invalid";
    }
  };
  const validateStartTime = (startTime: string): StartTimeError | undefined => {
    if (startTime == "") {
      return "empty";
    } else {
      return undefined;
    }
  };
  const validateEndTime = (endTime: string): EndTimeError | undefined => {
    if (endTime == "") {
      return "empty";
    } else {
      return undefined;
    }
  };
  const validateMemo = (memo: string): MemoError | undefined => {
    if (memo.length > 255) {
      return "length";
    } else {
      return undefined;
    }
  };

  return {
    validateTitle,
    validateDate,
    validateStartTime,
    validateEndTime,
    validateMemo,
  };
}
