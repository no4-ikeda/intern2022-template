import { useCallback, useContext } from "react";
import { YearMonthContext } from "../../../contexts/YearMonthContext";
import { HolidayModalPresentational } from "./HolidayModalPresetational";
import type { Dayjs } from "dayjs";

type Props = {
  selectedDay: Dayjs;
};

export const HolidayModalContainer = ({ selectedDay }: Props) => {
  const { setIsShowHolidayModal, holidayList } = useContext(YearMonthContext);

  const holiday = holidayList.filter((holiday) => {
    return holiday.date.isSame(selectedDay);
  })[0];

  // モーダルの外側を押したときモーダルを消す
  const handleOutOfModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowHolidayModal(false);
    },
    [setIsShowHolidayModal]
  );

  // ×ボタンが押されたとき
  const handleCloseButtonClick = useCallback(() => {
    setIsShowHolidayModal(false);
  }, [setIsShowHolidayModal]);

  return (
    <HolidayModalPresentational
      holiday={holiday}
      onOutOfModalClick={handleOutOfModalClick}
      onCloseButtonClick={handleCloseButtonClick}
    />
  );
};
