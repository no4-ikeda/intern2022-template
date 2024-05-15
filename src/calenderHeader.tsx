import src from "./img/calender.png";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import type { CalendarHeaderProps } from "./types/types";

dayjs.locale(ja);

export default function CalenderHeader({
  handleBackMonthButtonClick,
  handleNextMonthButtonClick,
  currentPageMonth,
}: CalendarHeaderProps) {
  return (
    <>
      <span className="calenderHeader">
        <img src={src} className="img" alt="logo" />
        <p className="calendar">カレンダー</p>
        <button onClick={handleBackMonthButtonClick} className="toBackMonth">
          <MdChevronLeft />
        </button>
        <label className="yearMonth">
          {dayjs(dayjs().month(currentPageMonth)).format("YYYY MMMM")}
        </label>
        <button onClick={handleNextMonthButtonClick} className="toNextMonth">
          <MdChevronRight />
        </button>
      </span>
    </>
  );
}
