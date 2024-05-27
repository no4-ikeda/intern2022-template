import { useCallback } from "react";
import { DetailModalPresentational } from "./DetailModalPresentational";
import type { Schedule } from "~/types/types";
import { useSetRecoilState } from "recoil";
import { isShowModalAtom, savedScheduleSelector } from "~/globalState/states";

type Props = {
  selectedSchedule: Schedule | null;
};

export const DetailModalContainer = ({ selectedSchedule }: Props) => {
  const setSaveSchedule = useSetRecoilState(savedScheduleSelector);
  const setIsShowDetailModal = useSetRecoilState(isShowModalAtom);

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget &&
        setIsShowDetailModal((modal) => ({
          ...modal,
          ...{ isShowDetailModal: false },
        }));
    },
    [setIsShowDetailModal]
  );

  // 編集、削除、クローズボタンが押されたとき
  const handleEditButtonClick = useCallback(() => {
    // 詳細モーダルを閉じる
    setIsShowDetailModal((modal) => ({
      ...modal,
      ...{ isShowDetailModal: false },
    }));

    // 入力モーダルを開く
    setIsShowDetailModal((modal) => ({
      ...modal,
      ...{ isShowInputModal: true },
    }));
  }, [setIsShowDetailModal]);

  const handleTrashButtonClick = useCallback(() => {
    if (selectedSchedule == null) {
      return null;
    }

    // ローカルストレージへの削除処理
    setSaveSchedule({
      savedSchedules: [],
      type: "delete",
      payload: selectedSchedule,
    });

    // 詳細モーダルを閉じる
    setIsShowDetailModal((modal) => ({
      ...modal,
      ...{ isShowDetailModal: false },
    }));
  }, [selectedSchedule, setIsShowDetailModal, setSaveSchedule]);

  const handleCloseButtonClick = useCallback(() => {
    // 詳細モーダルを閉じる
    setIsShowDetailModal((modal) => ({
      ...modal,
      ...{ isShowDetailModal: false },
    }));
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
