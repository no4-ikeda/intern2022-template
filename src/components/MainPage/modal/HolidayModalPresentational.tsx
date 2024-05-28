import { GoClock } from "react-icons/go";
import { IoIosCalendar } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import type { Holiday } from "~/types/types";

type Props = {
  holiday: Holiday;
  onOutOfModalClick: (
    target: EventTarget,
    currentTarget: EventTarget & HTMLDivElement
  ) => void;
  onCloseButtonClick: () => void;
};

export const HolidayModalPresentational = ({
  holiday,
  onOutOfModalClick,
  onCloseButtonClick,
}: Props) => {
  const handleClickOutOfModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    onOutOfModalClick(e.target, e.currentTarget);
  };
  return (
    <>
      <div className="outOfModal" onClick={handleClickOutOfModal}>
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
            <span className="title">：{holiday.text ?? ""}</span>
          </div>
          <div className="detailDate">
            <span className="icons">
              <IoIosCalendar size={25} />
            </span>
            <span className="date">：{holiday.date.format("YYYY-MM-DD")}</span>
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
};
