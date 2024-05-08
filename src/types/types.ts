import type { Dayjs } from "dayjs";
import type { ReactNode } from "react";

export type WrapperProps = {
  children: ReactNode;
};

export type CurrentPageMonthProps = {
  currentPageMonth: number;
  setCurrentPageMonth: React.Dispatch<React.SetStateAction<number>>;
};

export type DayProps = {
  currentPageMonth: number;
  date: Dayjs;
};

export type MonthProps = {
  currentPageMonth: number;
  dateMatrix: Dayjs[];
};

export type ScheduleState = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
  id: number;
};

export type ScheduleEnteredProps = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
};

type PushAction = {
  type: "push";
  payload: ScheduleState;
};
type UpdateAction = {
  type: "update";
  payload: ScheduleState;
};
type DeleteAction = {
  type: "delete";
  payload: ScheduleState;
};
export type Action = PushAction | UpdateAction | DeleteAction;
