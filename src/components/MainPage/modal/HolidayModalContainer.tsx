import { useCallback } from "react";
import { HolidayModalPresentational } from "./HolidayModalPresentational";
import type { Dayjs } from "dayjs";
import { useRecoilValue } from "recoil";
import { holidayListAtom } from "~/atoms/holidayListAtom";

type Props = {
  selectedDay: Dayjs;
  onRequestCloseHolidayModal: () => void;
};

export const HolidayModalContainer = ({
  selectedDay,
  onRequestCloseHolidayModal,
}: Props) => {
  const holidayList = useRecoilValue(holidayListAtom);

  const holiday = holidayList.filter((holiday) => {
    return holiday.date.isSame(selectedDay);
  })[0];

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(() => {
    onRequestCloseHolidayModal();
  }, [onRequestCloseHolidayModal]);

  // ×ボタンが押されたとき
  const handleCloseButtonClick = useCallback(() => {
    // 祝日モーダルを閉じる
    onRequestCloseHolidayModal();
  }, [onRequestCloseHolidayModal]);

  return (
    <HolidayModalPresentational
      holiday={holiday}
      onOutOfModalClick={handleOutOfModalClick}
      onCloseButtonClick={handleCloseButtonClick}
    />
  );
};
