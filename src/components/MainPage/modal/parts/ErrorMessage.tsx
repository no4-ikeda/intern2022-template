import { FiAlertTriangle } from "react-icons/fi";

type ErrorMessageProps = {
  errorMessage: string;
};

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <span className="isError">
      <span className="isErrorCaution">
        <FiAlertTriangle color="#ff0000" />
      </span>
      <span>{errorMessage}</span>
    </span>
  );
};
