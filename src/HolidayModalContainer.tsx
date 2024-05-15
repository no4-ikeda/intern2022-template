import { useCallback, useContext } from "react";
import YearMonthContext from "./context/YearMonthContext";
import type { HolidayModalContainerProps } from "./types/types";
import HolidayModalPresenter from "./HolidayModalPreseter";

export default function HolidayModalContainer({
  selectedDay,
}: HolidayModalContainerProps) {
  const { setIsShowHolidayModal, holiday } = useContext(YearMonthContext);

  const holidayKeys = Object.keys(holiday);
  const holidayValues = Object.values(holiday);

  const holidayIndex = holidayKeys.findIndex(
    (data) => data === selectedDay.format("YYYY-MM-DD")
  );
  const holidayName = holidayValues[holidayIndex];

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
    <HolidayModalPresenter
      onOutOfModalClick={onOutOfModalClick}
      onCloseButtonClick={onCloseButtonClick}
      holidayName={holidayName}
      selectedDay={selectedDay}
    />
  );
}
