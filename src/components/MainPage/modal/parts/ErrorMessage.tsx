import { FiAlertTriangle } from "react-icons/fi";

type ErrorMessageProps = {
  errorMessage: string;
};

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <span className={errorMessage ? "isError" : "isNormally"}>
      <span className={errorMessage ? "isErrorCaution" : "isNormallyCaution"}>
        <FiAlertTriangle color="#ff0000" />
      </span>
      <span>{errorMessage}</span>
    </span>
  );
};
