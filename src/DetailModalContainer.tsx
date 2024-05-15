import { useCallback, useContext } from "react";
import YearMonthContext from "./context/YearMonthContext";
import type { DetailModalContainerProps } from "./types/types";
import DetailModalPresenter from "./DetailModalPresenter";

export default function DetailModalContainer({
  selectedSchedule,
}: DetailModalContainerProps) {
  const { setIsShowEditModal, setIsShowDetailModal, dispatchCalEvent } =
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
    setIsShowEditModal(true);
  }, [setIsShowDetailModal, setIsShowEditModal]);

  const handleTrashButtonClick = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }
    dispatchCalEvent({ type: "delete", payload: selectedSchedule });
    setIsShowDetailModal(false);
  }, [dispatchCalEvent, selectedSchedule, setIsShowDetailModal]);

  const handleCloseButtonClick = useCallback(() => {
    setIsShowDetailModal(false);
  }, [setIsShowDetailModal]);

  if (selectedSchedule == null) {
    return null;
  }
  return (
    <DetailModalPresenter
      handleOutOfModalClick={handleOutOfModalClick}
      handleEditButtonClick={handleEditButtonClick}
      handleTrashButtonClick={handleTrashButtonClick}
      handleCloseButtonClick={handleCloseButtonClick}
      selectedSchedule={selectedSchedule}
    />
  );
}
