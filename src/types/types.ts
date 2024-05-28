import type { Dayjs } from "dayjs";

export type Schedule = {
  title: string;
  date: Dayjs | null;
  startTime: string;
  endTime: string;
  memo: string;
  id: number;
};

export type TitleError = "empty" | "length";
export type DateError = "invalid";
export type StartTimeError = "empty";
export type EndTimeError = "empty";
export type MemoError = "length";

export type Holiday = {
  date: Dayjs;
  text: string;
};

export type SaveScheduleProps = {
  schedules: Schedule[];
};
