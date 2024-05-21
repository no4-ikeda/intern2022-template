import { useCallback, useContext } from "react";
import YearMonthContext from "../../../contexts/YearMonthContext";
import HolidayListModalPresentational from "./HolidayModalPresetational";
import type { Dayjs } from "dayjs";

type HolidayModalContainerProps = {
  selectedDay: Dayjs;
};

export default function HolidayListModalContainer({
  selectedDay,
}: HolidayModalContainerProps) {
  const { setIsShowHolidayModal, holidayList } = useContext(YearMonthContext);

  const holiday = holidayList.filter((holiday) => {
    return holiday.date.isSame(selectedDay);
  });

  // モーダルの外側を押したときモーダルを消す
  const onOutOfModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowHolidayModal(false);
    },
    [setIsShowHolidayModal]
  );

  // ×ボタンが押されたとき
  const onCloseButtonClick = useCallback(() => {
    setIsShowHolidayModal(false);
  }, [setIsShowHolidayModal]);

  return (
    <HolidayListModalPresentational
      onOutOfModalClick={onOutOfModalClick}
      onCloseButtonClick={onCloseButtonClick}
      holiday={holiday}
      selectedDay={selectedDay}
    />
  );
}
