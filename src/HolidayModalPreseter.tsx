import { GoClock } from "react-icons/go";
import { IoIosCalendar } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import type { HolidayModalPresenterProps } from "./types/types";

export default function HolidayModalPresenter({
  onOutOfModalClick,
  onCloseButtonClick,
  holidayName,
  selectedDay,
}: HolidayModalPresenterProps) {
  return (
    <>
      <div className="outOfModal" onClick={(e) => onOutOfModalClick(e)}>
        <div className="holidayModal">
          <header>
            <span className="holidayHeader">予定の確認</span>
            <button className="headerIcons" onClick={onCloseButtonClick}>
              <IoCloseSharp />
            </button>
          </header>

          <div className="detailTitle">
            <span className="icons">
              <MdTitle size={25} />
            </span>
            <span className="title">：{holidayName}</span>
          </div>
          <div className="detailDate">
            <span className="icons">
              <IoIosCalendar size={25} />
            </span>
            <span className="date">：{selectedDay.format("YYYY-MM-DD")}</span>
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
