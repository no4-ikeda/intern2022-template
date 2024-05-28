import { useCallback } from "react";
import { HolidayModalPresentational } from "./HolidayModalPresentational";
import type { Dayjs } from "dayjs";
import { useRecoilValue } from "recoil";
import { holidayListAtom } from "~/atoms/holidayListAtom";

type Props = {
  selectedDay: Dayjs;
  closeHolidayModal: () => void;
};

export const HolidayModalContainer = ({
  selectedDay,
  closeHolidayModal,
}: Props) => {
  const holidayList = useRecoilValue(holidayListAtom);

  const holiday = holidayList.filter((holiday) => {
    return holiday.date.isSame(selectedDay);
  })[0];

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(
    (target: EventTarget, currentTarget: EventTarget & HTMLDivElement) => {
      target === currentTarget && closeHolidayModal();
    },
    [closeHolidayModal]
  );

  // ×ボタンが押されたとき
  const handleCloseButtonClick = useCallback(() => {
    // 祝日モーダルを閉じる
    closeHolidayModal();
  }, [closeHolidayModal]);

  return (
    <HolidayModalPresentational
      holiday={holiday}
      onOutOfModalClick={handleOutOfModalClick}
      onCloseButtonClick={handleCloseButtonClick}
    />
  );
};
