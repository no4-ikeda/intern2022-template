import type { Dayjs } from "dayjs";
import type dayjs from "dayjs";
import type { ReactNode } from "react";

export type WrapperProps = {
  children: ReactNode;
};

export type CalendarHeaderProps = {
  onBackMonthButtonClick: () => void;
  onNextMonthButtonClick: () => void;
  currentPageMonth: number;
};

export type DayContainerProps = {
  currentPageMonth: number;
  date: dayjs.Dayjs;
  onCreateNewClick: (date: Dayjs) => void;
  onHolidayClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Dayjs
  ) => void;
  onScheduleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    event: Schedule
  ) => void;
};

export type MonthProps = {
  currentPageMonth: number;
  dateMatrix: Dayjs[];
  onCreateNewClick: (date: Dayjs) => void;
  onHolidayClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Dayjs
  ) => void;
  onScheduleClick: (
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
  onSubmitClick: (enteredSchedule: Schedule) => void;
  titleError: TitleError | undefined;
  dateError: DateError | undefined;
  startTimeError: StartTimeError | undefined;
  endTimeError: EndTimeError | undefined;
  memoError: MemoError | undefined;
};

export type EditModalContainerProps = {
  selectedSchedule: Schedule | null;
  onSubmitClick: (
    enteredSchedule: Schedule,
    selectedSchedule?: Schedule | null
  ) => void;
  titleError: TitleError | undefined;
  dateError: DateError | undefined;
  startTimeError: StartTimeError | undefined;
  endTimeError: EndTimeError | undefined;
  memoError: MemoError | undefined;
};

export type DayPresenterProps = {
  onCreateNewClick: (date: Dayjs) => void;
  isToday: () => boolean;
  onHolidayClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: dayjs.Dayjs
  ) => void;
  onScheduleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    event: Schedule
  ) => void;
  date: dayjs.Dayjs;
  currentMonthIndex: number;
  holidayToday: string;
  dayEvents: Schedule[];
};

export type CreateNewModalPresenterProps = {
  onOutOfModalClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSaveButtonClick: () => void;
  onCloseButtonClick: () => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  date: string;
  today: string;
  titleError: TitleError | undefined;
  dateError: DateError | undefined;
  startTimeError: StartTimeError | undefined;
  endTimeError: EndTimeError | undefined;
  memoError: MemoError | undefined;
};

export type EditModalPresenterProps = {
  onOutOfModalClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSaveButtonClick: () => void;
  onTrashButtonClick: () => void;
  onCloseButtonClick: () => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  today: string;
  titleError: TitleError | undefined;
  dateError: DateError | undefined;
  startTimeError: StartTimeError | undefined;
  endTimeError: EndTimeError | undefined;
  memoError: MemoError | undefined;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
};

export type DetailModalPresenterProps = {
  onOutOfModalClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEditButtonClick: () => void;
  onTrashButtonClick: () => void;
  onCloseButtonClick: () => void;
  selectedSchedule: Schedule;
};

export type HolidayModalPresenterProps = {
  onOutOfModalClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCloseButtonClick: () => void;
  holidayName: string;
  selectedDay: Dayjs;
};

export type TitleError = "empty" | "length";
export type DateError = "invalid";
export type StartTimeError = "empty";
export type EndTimeError = "empty";
export type MemoError = "length";

export type ValidateTitleProps = {
  titleError: TitleError;
};
export type ValidateDateProps = {
  dateError: DateError;
};
export type ValidateStartTimeProps = {
  startTimeError: StartTimeError;
};
export type ValidateEndTimeProps = {
  endTimeError: EndTimeError;
};
export type ValidateMemoProps = {
  memoError: MemoError;
};

export type TitleErrorProps = {
  titleErrorMessage: string;
};
export type DateErrorProps = {
  dateErrorMessage: string;
};
export type StartTimeErrorProps = {
  startTimeErrorMessage: string;
};
export type EndTimeErrorProps = {
  endTimeErrorMessage: string;
};
export type MemoErrorProps = {
  memoErrorMessage: string;
};
