import type { Dayjs } from "dayjs";
import type dayjs from "dayjs";
import type { ReactNode } from "react";

export type WrapperProps = {
  children: ReactNode;
};

export type CalendarHeaderProps = {
  handleBackMonth: () => void;
  handleNextMonth: () => void;
  currentPageMonth: number;
};

export type DayContainerProps = {
  currentPageMonth: number;
  date: dayjs.Dayjs;
  handleClickCreateNew: (date: Dayjs) => void;
  handleClickHoliday: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Dayjs
  ) => void;
  handleClickEvent: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    event: Schedule
  ) => void;
};

export type MonthProps = {
  currentPageMonth: number;
  dateMatrix: Dayjs[];
  handleClickCreateNew: (date: Dayjs) => void;
  handleClickHoliday: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Dayjs
  ) => void;
  handleClickEvent: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    event: Schedule
  ) => void;
};

export type Schedule = {
  title: string;
  date: string;
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

export type HolidayModalContainerProps = {
  selectedDay: Dayjs;
};

export type DetailModalContainerProps = {
  selectedSchedule: Schedule | null;
};

export type CreateNewModalContainerProps = {
  handleClickSubmit: (scheduleEntered: Schedule) => void;
};

export type EditModalContainerProps = {
  selectedSchedule: Schedule | null;
  handleClickSubmit: (
    scheduleEntered: Schedule,
    selectedSchedule?: Schedule | null
  ) => void;
};

export type ValidateProps = {
  calendarEvent: Schedule;
  titleEmpty: () => void;
  titleOverFlow: () => void;
  validTitle: () => void;
  invalidDate: () => void;
  validDate: () => void;
  startTimeEmpty: () => void;
  validStartTime: () => void;
  endTimeEmpty: () => void;
  validEndTime: () => void;
  memoOvarFlow: () => void;
  validMemo: () => void;
};

export type DayPresenterProps = {
  handleClickCreateNew: (date: Dayjs) => void;
  isToday: () => boolean;
  handleClickHoliday: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: dayjs.Dayjs
  ) => void;
  handleClickEvent: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    event: Schedule
  ) => void;
  date: dayjs.Dayjs;
  currentMonthIndex: number;
  holidayToday: string;
  dayEvents: Schedule[];
};

export type CreateNewModalPresenterProps = {
  handleClickOutOfModal: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleSubmit: () => void;
  handleClickClose: () => void;
  handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeStartTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEndTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  date: string;
  today: string;
  errorMessageTitle: string;
  errorMessageDate: string;
  errorMessageStartTime: string;
  errorMessageEndTime: string;
  errorMessageMemo: string;
};

export type EditModalPresenterProps = {
  handleClickOutOfModal: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleSubmit: () => void;
  handleClickTrash: () => void;
  handleClickClose: () => void;
  handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeStartTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEndTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  today: string;
  errorMessageTitle: string;
  errorMessageDate: string;
  errorMessageStartTime: string;
  errorMessageEndTime: string;
  errorMessageMemo: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
};

export type DetailModalPresenterProps = {
  handleClickOutOfModal: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleClickEdit: () => void;
  handleClickTrash: () => void;
  handleClickClose: () => void;
  selectedSchedule: Schedule;
};

export type HolidayModalPresenterProps = {
  handleClickOutOfModal: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleClickClose: () => void;
  holidayName: string;
  selectedDay: Dayjs;
};
