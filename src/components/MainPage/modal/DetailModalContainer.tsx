import { useCallback } from "react";
import { DetailModalPresentational } from "./DetailModalPresentational";
import type { Schedule } from "~/types/types";
import { useSchedules } from "~/hooks/useSchedules";
import { useModalState } from "~/hooks/useModal";

type Props = {
  selectedSchedule: Schedule | null;
};

export const DetailModalContainer = ({ selectedSchedule }: Props) => {
  const { deleteSchedule } = useSchedules();
  const [, setIsDetailModalOpen] = useModalState("detail");
  const [, setIsInputModalOpen] = useModalState("input");

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(() => {
    setIsDetailModalOpen(false);
  }, [setIsDetailModalOpen]);

  // 編集、削除、クローズボタンが押されたとき
  const handleEditButtonClick = useCallback(() => {
    // 詳細モーダルを閉じる
    setIsDetailModalOpen(false);

    // 入力モーダルを開く
    setIsInputModalOpen(true);
  }, [setIsDetailModalOpen, setIsInputModalOpen]);

  const handleTrashButtonClick = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }

    deleteSchedule(selectedSchedule);

    // 詳細モーダルを閉じる
    setIsDetailModalOpen(false);
  }, [selectedSchedule, deleteSchedule, setIsDetailModalOpen]);

  const handleCloseButtonClick = useCallback(() => {
    // 詳細モーダルを閉じる
    setIsDetailModalOpen(false);
  }, [setIsDetailModalOpen]);

  if (selectedSchedule == null) {
    return null;
  }
  return (
    <DetailModalPresentational
      selectedSchedule={selectedSchedule}
      onOutOfModalClick={handleOutOfModalClick}
      onEditButtonClick={handleEditButtonClick}
      onTrashButtonClick={handleTrashButtonClick}
      onCloseButtonClick={handleCloseButtonClick}
    />
  );
};
