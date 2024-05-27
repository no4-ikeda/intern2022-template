import type { Dayjs } from "dayjs";

export type Schedule = {
  title: string;
  date: Dayjs | null;
  startTime: string;
  endTime: string;
  memo: string;
  id: number;
};

type PushAction = {
  type: "push";
  payload: Schedule;
};
type UpdateAction = {
  type: "update";
  payload: Schedule;
};
type DeleteAction = {
  type: "delete";
  payload: Schedule;
};
export type Action = PushAction | UpdateAction | DeleteAction;

export type TitleError = "empty" | "length";
export type DateError = "invalid";
export type StartTimeError = "empty";
export type EndTimeError = "empty";
export type MemoError = "length";

export type Holiday = {
  date: Dayjs;
  text: string;
};
