import { useCallback, useContext } from "react";
import { YearMonthContext } from "../../../contexts/YearMonthContext";
import { DetailModalPresentational } from "./DetailModalPresentational";
import type { Schedule } from "~/types/types";

type Props = {
  selectedSchedule: Schedule | null;
};

export const DetailModalContainer = ({ selectedSchedule }: Props) => {
  const { setIsShowInputModal, setIsShowDetailModal, dispatchCalSchedule } =
    useContext(YearMonthContext);

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowDetailModal(false);
    },
    [setIsShowDetailModal]
  );

  // 編集、削除、クローズボタンが押されたとき
  const handleEditButtonClick = useCallback(() => {
    setIsShowDetailModal(false);
    setIsShowInputModal(true);
  }, [setIsShowDetailModal, setIsShowInputModal]);

  const handleTrashButtonClick = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }
    dispatchCalSchedule({ type: "delete", payload: selectedSchedule });
    setIsShowDetailModal(false);
  }, [dispatchCalSchedule, selectedSchedule, setIsShowDetailModal]);

  const handleCloseButtonClick = useCallback(() => {
    setIsShowDetailModal(false);
  }, [setIsShowDetailModal]);

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
