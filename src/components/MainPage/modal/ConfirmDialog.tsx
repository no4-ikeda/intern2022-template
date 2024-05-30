import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export type ConfirmDialogResult = "confirm" | "cancel";

export type ConfirmDialogProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onRequestClose: (value: boolean) => void;
};

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  onRequestClose,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={() => onRequestClose(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onRequestClose(false)}>キャンセル</Button>
        <Button onClick={() => onRequestClose(true)}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
