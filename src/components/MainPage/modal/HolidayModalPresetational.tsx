import { GoClock } from "react-icons/go";
import { IoIosCalendar } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import type { Dayjs } from "dayjs";
import type { Holiday } from "~/types/types";

type HolidayModalPresentationalProps = {
  onOutOfModalClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCloseButtonClick: () => void;
  holiday: Holiday[];
  selectedDay: Dayjs;
};

export default function HolidayListModalPresentational({
  onOutOfModalClick,
  onCloseButtonClick,
  holiday,
  selectedDay,
}: HolidayModalPresentationalProps) {
  return (
    <>
      <div className="outOfModal" onClick={onOutOfModalClick}>
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
            <span className="title">：{holiday[0]?.text ?? ""}</span>
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
