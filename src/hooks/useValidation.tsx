import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type {
  TitleError,
  DateError,
  StartTimeError,
  EndTimeError,
  MemoError,
} from "../types/types";
import { useMemo } from "react";

type Props = {
  title: string;
  date: Dayjs;
  startTime: string;
  endTime: string;
  memo: string;
};

export const useValidation = ({
  title,
  date,
  startTime,
  endTime,
  memo,
}: Props) => {
  const titleError = useMemo<TitleError | undefined>(() => {
    if (title == "") {
      return "empty";
    } else if (title.length > 10) {
      return "length";
    } else {
      return undefined;
    }
  }, [title]);
  const dateError = useMemo<DateError | undefined>(() => {
    if (dayjs(date, "YYYY-MM-DD", true).isValid()) {
      return undefined;
    } else {
      return "invalid";
    }
  }, [date]);
  const startTimeError = useMemo<StartTimeError | undefined>(() => {
    if (startTime == "") {
      return "empty";
    } else {
      return undefined;
    }
  }, [startTime]);
  const endTimeError = useMemo<EndTimeError | undefined>(() => {
    if (endTime == "") {
      return "empty";
    } else {
      return undefined;
    }
  }, [endTime]);
  const memoError = useMemo<MemoError | undefined>(() => {
    if (memo.length > 255) {
      return "length";
    } else {
      return undefined;
    }
  }, [memo]);

  return {
    titleError,
    dateError,
    startTimeError,
    endTimeError,
    memoError,
  };
};
