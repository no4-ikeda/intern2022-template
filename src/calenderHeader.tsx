import { useContext } from "react";
import src from "./img/calender.png";
import YearMonthContext from "./context/context";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

dayjs.locale(ja);

export default function CalenderHeader() {
  const { monthIndex, setMonthIndex } = useContext(YearMonthContext);

  {
    /** 次月、前月ボタンを押したとき */
  }
  const handleBackMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handelNextMonth = () => {
    setMonthIndex(monthIndex + 1);
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
          {dayjs(dayjs().month(monthIndex)).format("YYYY MMMM")}
        </label>
        <button onClick={handelNextMonth} className="toNextMonth">
          <MdChevronRight />
        </button>
      </span>
    </>
  );
}
