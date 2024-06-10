import { useCallback } from "react";

export type ConfirmDialogResult = "confirm" | "cancel";

export type ConfirmDialogProps = {
  title?: string;
  message?: string;
  onRequestClose: (value: boolean) => void;
};

export const ConfirmDialog = ({
  title,
  message,
  onRequestClose,
}: ConfirmDialogProps) => {
  const handleClickOutOfModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      onRequestClose(false);
    },
    [onRequestClose]
  );
  const handleClickOk = useCallback(() => {
    onRequestClose(true);
  }, [onRequestClose]);
  const handleClickCancel = useCallback(() => {
    onRequestClose(false);
  }, [onRequestClose]);
  return (
    <div
      className={title ? "Overlay" : "outOfModal"}
      onClick={handleClickOutOfModal}
    >
      <div className="confirmModal">
        <div>
          <h1 className="title">{title}</h1>
          <p className="message">{message}</p>
        </div>
        <div className="leftButton">
          <button className="cancel" onClick={handleClickCancel}>
            キャンセル
          </button>
        </div>
        <div className="rightButton">
          <button className="ok" onClick={handleClickOk}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
