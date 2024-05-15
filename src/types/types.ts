import type { Dayjs } from "dayjs";
import type dayjs from "dayjs";
import type { ReactNode } from "react";

export type WrapperProps = {
  children: ReactNode;
};

export type CalendarHeaderProps = {
  handleBackMonthButtonClick: () => void;
  handleNextMonthButtonClick: () => void;
  currentPageMonth: number;
};

export type DayContainerProps = {
  currentPageMonth: number;
  date: dayjs.Dayjs;
  handleCreateNewClick: (date: Dayjs) => void;
  handleHolidayClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Dayjs
  ) => void;
  handleScheduleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    event: Schedule
  ) => void;
};

export type MonthProps = {
  currentPageMonth: number;
  dateMatrix: Dayjs[];
  handleCreateNewClick: (date: Dayjs) => void;
  handleHolidayClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: Dayjs
  ) => void;
  handleScheduleClick: (
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
  handleSubmitClick: (enteredSchedule: Schedule) => void;
  titleError: TitleError | undefined;
  dateError: DateError | undefined;
  startTimeError: StartTimeError | undefined;
  endTimeError: EndTimeError | undefined;
  memoError: MemoError | undefined;
};

export type EditModalContainerProps = {
  selectedSchedule: Schedule | null;
  handleSubmitClick: (
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
  handleCreateNewClick: (date: Dayjs) => void;
  isToday: () => boolean;
  handleHolidayClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    date: dayjs.Dayjs
  ) => void;
  handleScheduleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    event: Schedule
  ) => void;
  date: dayjs.Dayjs;
  currentMonthIndex: number;
  holidayToday: string;
  dayEvents: Schedule[];
};

export type CreateNewModalPresenterProps = {
  handleOutOfModalClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleSaveButtonClick: () => void;
  handleCloseButtonClick: () => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  date: string;
  today: string;
  titleError: TitleError | undefined;
  dateError: DateError | undefined;
  startTimeError: StartTimeError | undefined;
  endTimeError: EndTimeError | undefined;
  memoError: MemoError | undefined;
};

export type EditModalPresenterProps = {
  handleOutOfModalClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleSaveButtonClick: () => void;
  handleTrashButtonClick: () => void;
  handleCloseButtonClick: () => void;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
  handleOutOfModalClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleEditButtonClick: () => void;
  handleTrashButtonClick: () => void;
  handleCloseButtonClick: () => void;
  selectedSchedule: Schedule;
};

export type HolidayModalPresenterProps = {
  handleOutOfModalClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  handleCloseButtonClick: () => void;
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
