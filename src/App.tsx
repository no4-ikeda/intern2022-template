import { useEffect, useContext } from "react";
import { useState } from "react";
import { getMonth } from "./getDate";
import { Month } from "./month";
import CalenderHeader from "./calenderHeader";
import YearMonthContext from "./context/context";
import EventModal from "./eventModal";
import EditModal from "./editModal";
import DetailModal from "./detailModal";
import HolidayModal from "./holidayModal";

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {
    monthIndex,
    showModal,
    showEditModal,
    showDetailModal,
    showHolidayModal,
  } = useContext(YearMonthContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showModal && <EventModal />}
      {showEditModal && <EditModal />}
      {showDetailModal && <DetailModal />}
      {showHolidayModal && <HolidayModal />}
      <CalenderHeader />
      <Month month={currentMonth} />
    </>
  );
}
