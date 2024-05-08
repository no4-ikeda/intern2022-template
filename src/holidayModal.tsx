import { useCallback, useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import YearMonthContext from "./context/Context";
import { IoIosCalendar } from "react-icons/io";
import { GoClock } from "react-icons/go";

export default function HolidayModal() {
  const { setIsShowHolidayModal, daySelected, holiday } =
    useContext(YearMonthContext);

  const holidayKeys = Object.keys(holiday);
  const holidayValues = Object.values(holiday);

  const holidayIndex = holidayKeys.findIndex(
    (data) => data === daySelected.format("YYYY-MM-DD")
  );
  const holidaySelected = holidayValues[holidayIndex];

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
    <>
      <div className="outOfModal" onClick={(e) => handleClickOutOfModal(e)}>
        <div className="holidayModal">
          <header>
            <span className="holidayHeader">予定の確認</span>
            <button className="headerIcons" onClick={handleClickClose}>
              <IoCloseSharp />
            </button>
          </header>

          <div className="detailTitle">
            <span className="icons">
              <MdTitle size={25} />
            </span>
            <span className="title">：{holidaySelected}</span>
          </div>
          <div className="detailDate">
            <span className="icons">
              <IoIosCalendar size={25} />
            </span>
            <span className="date">：{daySelected.format("YYYY-MM-DD")}</span>
          </div>
          <div className="detailTime">
            <span className="icons">
              <GoClock size={25} />
            </span>
            <span className="time">：終日</span>
          </div>
        </div>
      </div>
    </>
  );
}
