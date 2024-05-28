import { useCallback } from "react";
import { DetailModalPresentational } from "./DetailModalPresentational";
import type { Schedule } from "~/types/types";
import { useOperateSchedule } from "~/hooks/useOperateSchedule";

type Props = {
  selectedSchedule: Schedule | null;
  closeDetailModal: () => void;
  openInputModal: () => void;
};

export const DetailModalContainer = ({
  selectedSchedule,
  closeDetailModal,
  openInputModal,
}: Props) => {
  const operateSchedule = useOperateSchedule();

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(
    (target: EventTarget, currentTarget: EventTarget) => {
      target === currentTarget && closeDetailModal();
    },
    [closeDetailModal]
  );

  // 編集、削除、クローズボタンが押されたとき
  const handleEditButtonClick = useCallback(() => {
    // 詳細モーダルを閉じる
    closeDetailModal();

    // 入力モーダルを開く
    openInputModal();
  }, [closeDetailModal, openInputModal]);

  const handleTrashButtonClick = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }

    operateSchedule({ type: "delete", payload: selectedSchedule });

    // 詳細モーダルを閉じる
    closeDetailModal();
  }, [closeDetailModal, operateSchedule, selectedSchedule]);

  const handleCloseButtonClick = useCallback(() => {
    // 詳細モーダルを閉じる
    closeDetailModal();
  }, [closeDetailModal]);

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
