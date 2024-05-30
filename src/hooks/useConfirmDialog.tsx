import { useCallback, useState } from "react";
import type { ConfirmDialogProps } from "~/components/MainPage/modal/ConfirmDialog";
import { ConfirmDialog } from "~/components/MainPage/modal/ConfirmDialog";

type ConfirmDialogParam = {
  title: string;
  message: string;
};

type useDeleteConfirmDialogOutput = {
  confirmDialog: JSX.Element | undefined;
  openDeleteConfirmDialog: (param: ConfirmDialogParam) => Promise<boolean>;
};

export const useDeleteConfirmDialog = (): useDeleteConfirmDialogOutput => {
  const [modalConfig, setModalConfig] = useState<
    ConfirmDialogProps | undefined
  >();

  const openDeleteConfirmDialog = useCallback((param: ConfirmDialogParam) => {
    return new Promise<boolean>((resolve) => {
      setModalConfig({
        ...param,
        isOpen: true,
        onRequestClose: (isOk: boolean) => {
          setModalConfig(undefined);
          resolve(isOk);
        },
      });
    });
  }, []);

  return {
    confirmDialog: modalConfig ? <ConfirmDialog {...modalConfig} /> : undefined,
    openDeleteConfirmDialog,
  };
};
