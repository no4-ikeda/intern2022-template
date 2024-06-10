import { useCallback } from "react";
import { DetailModalPresentational } from "./DetailModalPresentational";
import type { Schedule } from "~/types/types";
import { useSchedules } from "~/hooks/useSchedules";
import { useDeleteConfirmDialog } from "~/hooks/useConfirmDialog";

type Props = {
  selectedSchedule: Schedule | null;
  onRequestCloseDetailModal: () => void;
  onRequestOpenInputModal: () => void;
};

export const DetailModalContainer = ({
  selectedSchedule,
  onRequestCloseDetailModal,
  onRequestOpenInputModal,
}: Props) => {
  const { deleteSchedule } = useSchedules();
  const { confirmDialog, openDeleteConfirmDialog } = useDeleteConfirmDialog();

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(() => {
    onRequestCloseDetailModal();
  }, [onRequestCloseDetailModal]);

  // 編集ボタン押下時
  const handleEditButtonClick = useCallback(() => {
    // 詳細モーダルを閉じる
    onRequestCloseDetailModal();

    // 入力モーダルを開く
    onRequestOpenInputModal();
  }, [onRequestCloseDetailModal, onRequestOpenInputModal]);

  // 削除ボタン押下時
  const handleTrashButtonClick = useCallback(async () => {
    if (selectedSchedule == null) {
      return null;
    }

    const isOk = await openDeleteConfirmDialog({
      title: "削除したら元に戻すことはできません",
      message: "本当に削除してよろしいですか？",
    });

    if (!isOk) {
      return;
    }

    deleteSchedule(selectedSchedule);

    // 詳細モーダルを閉じる
    onRequestCloseDetailModal();
  }, [
    selectedSchedule,
    openDeleteConfirmDialog,
    deleteSchedule,
    onRequestCloseDetailModal,
  ]);

  // 閉じるボタン押下時
  const handleCloseButtonClick = useCallback(() => {
    // 詳細モーダルを閉じる
    onRequestCloseDetailModal();
  }, [onRequestCloseDetailModal]);

  if (selectedSchedule == null) {
    return null;
  }
  return (
    <DetailModalPresentational
      confirmDialog={confirmDialog}
      selectedSchedule={selectedSchedule}
      onOutOfModalClick={handleOutOfModalClick}
      onEditButtonClick={handleEditButtonClick}
      onTrashButtonClick={handleTrashButtonClick}
      onCloseButtonClick={handleCloseButtonClick}
    />
  );
};
