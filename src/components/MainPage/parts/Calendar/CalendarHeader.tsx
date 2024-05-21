import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { RiCalendar2Fill } from "react-icons/ri";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

dayjs.locale(ja);

type CalendarHeaderPresentationalProps = {
  onBackMonthButtonClick: () => void;
  onNextMonthButtonClick: () => void;
  currentPageYear: number;
  currentPageMonth: number;
};

export default function CalendarHeaderPresentational({
  onBackMonthButtonClick,
  onNextMonthButtonClick,
  currentPageYear,
  currentPageMonth,
}: CalendarHeaderPresentationalProps) {
  return (
    <>
      <span className="calendarHeader">
        <RiCalendar2Fill color="#12bd45" size={60} />
        <p className="calendar">カレンダー</p>
        <button onClick={onBackMonthButtonClick} className="toBackMonth">
          <MdChevronLeft />
        </button>
        <label className="yearMonth">
          {currentPageYear} {currentPageMonth + 1}月
        </label>
        <button onClick={onNextMonthButtonClick} className="toNextMonth">
          <MdChevronRight />
        </button>
      </span>
    </>
  );
}
