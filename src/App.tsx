import { useContext, useMemo } from "react";
import { useState } from "react";
import { getMonth } from "./hooks/useDateMatrix";
import { Month } from "./Month";
import CalenderHeader from "./CalenderHeader";
import YearMonthContext from "./context/Context";
import CreateNewModal from "./CreateNewModal";
import EditModal from "./EditModal";
import DetailModal from "./DetailModal";
import HolidayModal from "./HolidayModal";
import dayjs from "dayjs";

export default function App() {
  const {
    isShowCreateNewModal,
    isShowEditModal,
    isShowDetailModal,
    isShowHolidayModal,
  } = useContext(YearMonthContext);

  // 現在ページに表示されている月 0~11
  const [currentPageMonth, setCurrentPageMonth] = useState<number>(
    dayjs().month()
  );

  const dateMatrix = useMemo(() => {
    return getMonth(currentPageMonth);
  }, [currentPageMonth]);

  return (
    <>
      {isShowCreateNewModal && <CreateNewModal />}
      {isShowEditModal && <EditModal />}
      {isShowDetailModal && <DetailModal />}
      {isShowHolidayModal && <HolidayModal />}
      <CalenderHeader
        currentPageMonth={currentPageMonth}
        setCurrentPageMonth={setCurrentPageMonth}
      />
      <Month currentPageMonth={currentPageMonth} dateMatrix={dateMatrix} />
    </>
  );
}
