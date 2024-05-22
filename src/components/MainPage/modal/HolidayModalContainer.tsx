import { useCallback, useContext } from "react";
import YearMonthContext from "../../../contexts/YearMonthContext";
import HolidayListModalPresentational from "./HolidayModalPresetational";
import type { Dayjs } from "dayjs";

type Props = {
  selectedDay: Dayjs;
};

export default function HolidayListModalContainer({ selectedDay }: Props) {
  const { setIsShowHolidayModal, holidayList } = useContext(YearMonthContext);

  const holiday = holidayList.filter((holiday) => {
    return holiday.date.isSame(selectedDay);
  });

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
    <HolidayListModalPresentational
      holiday={holiday}
      selectedDay={selectedDay}
      onOutOfModalClick={handleOutOfModalClick}
      onCloseButtonClick={handleCloseButtonClick}
    />
  );
}
