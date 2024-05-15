import { FiAlertTriangle } from "react-icons/fi";
import type {
  DateErrorProps,
  EndTimeErrorProps,
  MemoErrorProps,
  StartTimeErrorProps,
  TitleErrorProps,
} from "./types/types";

export function TitleErrorMessagePresenter({
  titleErrorMessage,
}: TitleErrorProps) {
  return (
    <span
      id="titleError"
      className={titleErrorMessage ? "isError" : "isNormally"}
    >
      <button
        className={titleErrorMessage ? "isErrorCaution" : "isNormallyCaution"}
      >
        <FiAlertTriangle color="#ff0000" />
      </button>
      <span id="titleErrorMessage">{titleErrorMessage}</span>
    </span>
  );
}

export function DateErrorMessagePresenter({
  dateErrorMessage,
}: DateErrorProps) {
  return (
    <span
      id="dateError"
      className={dateErrorMessage ? "isError" : "isNormally"}
    >
      <button
        className={dateErrorMessage ? "isErrorCaution" : "isNormallyCaution"}
      >
        <FiAlertTriangle color="#ff0000" />
      </button>
      <span id="dateErrorMessage">{dateErrorMessage}</span>
    </span>
  );
}
export function StartTimeErrorMessagePresenter({
  startTimeErrorMessage,
}: StartTimeErrorProps) {
  return (
    <span
      id="startTimeError"
      className={startTimeErrorMessage ? "isError" : "isNormally"}
    >
      <button
        className={
          startTimeErrorMessage ? "isErrorCaution" : "isNormallyCaution"
        }
      >
        <FiAlertTriangle color="#ff0000" />
      </button>
      <span id="startTimeErrorMessage">{startTimeErrorMessage}</span>
    </span>
  );
}
export function EndTimeErrorMessagePresenter({
  endTimeErrorMessage,
}: EndTimeErrorProps) {
  return (
    <span
      id="endTimeError"
      className={endTimeErrorMessage ? "isError" : "isNormally"}
    >
      <button
        className={endTimeErrorMessage ? "isErrorCaution" : "isNormallyCaution"}
      >
        <FiAlertTriangle color="#ff0000" />
      </button>
      <span id="endTimeErrorMessage">{endTimeErrorMessage}</span>
    </span>
  );
}
export function MemoErrorMessagePresenter({
  memoErrorMessage,
}: MemoErrorProps) {
  return (
    <span
      id="memoError"
      className={memoErrorMessage ? "isError" : "isNormally"}
    >
      <button
        className={memoErrorMessage ? "isErrorCaution" : "isNormallyCaution"}
      >
        <FiAlertTriangle color="#ff0000" />
      </button>
      <span id="memoErrorMessage">{memoErrorMessage}</span>
    </span>
  );
}
