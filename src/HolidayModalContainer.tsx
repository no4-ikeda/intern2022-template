import { useCallback, useContext } from "react";
import YearMonthContext from "./context/Context";
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
  const handleClickOutOfModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowHolidayModal(false);
    },
    [setIsShowHolidayModal]
  );

  // ×ボタンが押されたとき
  const handleClickClose = useCallback(() => {
    setIsShowHolidayModal(false);
  }, [setIsShowHolidayModal]);

  return (
    <HolidayModalPresenter
      handleClickOutOfModal={handleClickOutOfModal}
      handleClickClose={handleClickClose}
      holidayName={holidayName}
      selectedDay={selectedDay}
    />
  );
}
