import { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import YearMonthContext from "./context/context";
import { IoIosCalendar } from "react-icons/io";
import { GoClock } from "react-icons/go";

export default function HolidayModal() {
  const { setShowHolidayModal, daySelected, holiday } =
    useContext(YearMonthContext);

  const holidayKeys = Object.keys(holiday);
  const holidayValues = Object.values(holiday);

  const holidayIndex = holidayKeys.findIndex(
    (data) => data === daySelected.format("YYYY-MM-DD")
  );
  const holidaySelected = holidayValues[holidayIndex];

  return (
    <>
      {/**モーダルの外側を押したときモーダルを消す*/}
      <div
        className="outOfModal"
        onClick={(e) =>
          e.target === e.currentTarget && setShowHolidayModal(false)
        }
      >
        <div className="holidayModal">
          <header>
            <span className="holidayHeader">予定の確認</span>
            <button
              className="headerIcons"
              onClick={() => setShowHolidayModal(false)}
            >
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
