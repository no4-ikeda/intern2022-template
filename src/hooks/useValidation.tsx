import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type {
  TitleError,
  DateError,
  StartTimeError,
  EndTimeError,
  MemoError,
} from "../types/types";
import { useCallback } from "react";

export function useValidation() {
  const validateTitle = useCallback((title: string): TitleError | undefined => {
    if (title == "") {
      return "empty";
    } else if (title.length > 10) {
      return "length";
    } else {
      return undefined;
    }
  }, []);
  const validateDate = useCallback((date: Dayjs): DateError | undefined => {
    if (dayjs(date, "YYYY-MM-DD", true).isValid()) {
      return undefined;
    } else {
      return "invalid";
    }
  }, []);
  const validateStartTime = useCallback(
    (startTime: string): StartTimeError | undefined => {
      if (startTime == "") {
        return "empty";
      } else {
        return undefined;
      }
    },
    []
  );
  const validateEndTime = useCallback(
    (endTime: string): EndTimeError | undefined => {
      if (endTime == "") {
        return "empty";
      } else {
        return undefined;
      }
    },
    []
  );
  const validateMemo = useCallback((memo: string): MemoError | undefined => {
    if (memo.length > 255) {
      return "length";
    } else {
      return undefined;
    }
  }, []);

  return {
    validateTitle,
    validateDate,
    validateStartTime,
    validateEndTime,
    validateMemo,
  };
}
