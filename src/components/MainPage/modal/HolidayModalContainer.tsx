import { useCallback } from "react";
import { HolidayModalPresentational } from "./HolidayModalPresetational";
import type { Dayjs } from "dayjs";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { holidayListAtom, isShowModalAtom } from "~/globalState/states";

type Props = {
  selectedDay: Dayjs;
};

export const HolidayModalContainer = ({ selectedDay }: Props) => {
  const setIsShowModal = useSetRecoilState(isShowModalAtom);
  const holidayList = useRecoilValue(holidayListAtom);

  const holiday = holidayList.filter((holiday) => {
    return holiday.date.isSame(selectedDay);
  })[0];

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget &&
        setIsShowModal((modal) => ({
          ...modal,
          ...{ isShowHolidayModal: false },
        }));
    },
    [setIsShowModal]
  );

  // ×ボタンが押されたとき
  const handleCloseButtonClick = useCallback(() => {
    // 祝日モーダルを閉じる
    setIsShowModal((modal) => ({
      ...modal,
      ...{ isShowHolidayModal: false },
    }));
  }, [setIsShowModal]);

  return (
    <HolidayModalPresentational
      holiday={holiday}
      onOutOfModalClick={handleOutOfModalClick}
      onCloseButtonClick={handleCloseButtonClick}
    />
  );
};
