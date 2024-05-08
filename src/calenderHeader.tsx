import src from "./img/calender.png";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import type { CurrentPageMonthProps } from "./types/types";

dayjs.locale(ja);

export default function CalenderHeader({
  currentPageMonth,
  setCurrentPageMonth,
}: CurrentPageMonthProps) {
  // 次月、前月ボタンを押したとき
  const handleBackMonth = () => {
    setCurrentPageMonth((currentPageMonth) => currentPageMonth - 1);
  };
  const handelNextMonth = () => {
    setCurrentPageMonth((currentPageMonth) => currentPageMonth + 1);
  };

  return (
    <>
      <span className="calenderHeader">
        <img src={src} className="img" alt="logo" />
        <p className="calendar">カレンダー</p>
        <button onClick={handleBackMonth} className="toBackMonth">
          <MdChevronLeft />
        </button>
        <label className="yearMonth">
          {dayjs(dayjs().month(currentPageMonth)).format("YYYY MMMM")}
        </label>
        <button onClick={handelNextMonth} className="toNextMonth">
          <MdChevronRight />
        </button>
      </span>
    </>
  );
}
