import { useCallback } from "react";
import { HolidayModalPresentational } from "./HolidayModalPresentational";
import type { Dayjs } from "dayjs";
import { useRecoilValue } from "recoil";
import { holidayListAtom } from "~/atoms/holidayListAtom";
import { useModalState } from "~/hooks/useModal";

type Props = {
  selectedDay: Dayjs;
};

export const HolidayModalContainer = ({ selectedDay }: Props) => {
  const holidayList = useRecoilValue(holidayListAtom);
  const [, setIsHolidayModalOpen] = useModalState("holiday");

  const holiday = holidayList.filter((holiday) => {
    return holiday.date.isSame(selectedDay);
  })[0];

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(() => {
    setIsHolidayModalOpen(false);
  }, [setIsHolidayModalOpen]);

  // ×ボタンが押されたとき
  const handleCloseButtonClick = useCallback(() => {
    // 祝日モーダルを閉じる
    setIsHolidayModalOpen(false);
  }, [setIsHolidayModalOpen]);

  return (
    <HolidayModalPresentational
      holiday={holiday}
      onOutOfModalClick={handleOutOfModalClick}
      onCloseButtonClick={handleCloseButtonClick}
    />
  );
};
