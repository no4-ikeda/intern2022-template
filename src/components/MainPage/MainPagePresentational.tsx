import { CalendarBody } from "./parts/Calendar/CalendarBody";
import CalendarHeader from "./parts/Calendar/CalendarHeader";
import CreateNewModalContainer from "./modal/CreateNewModalContainer";
import EditModalContainer from "./modal/EditModalContainer";
import DetailModalContainer from "./modal/DetailModalContainer";
import HolidayModalContainer from "./modal/HolidayModalContainer";
import type { Dayjs } from "dayjs";
import type { Schedule } from "~/types/types";
import type dayjs from "dayjs";

type MainPagePresentationalProps = {
  onBackMonthButtonClick: () => void;
  onNextMonthButtonClick: () => void;
  onCreateNewClick: (date: dayjs.Dayjs) => void;
  onHolidayClick: (date: dayjs.Dayjs) => void;
  onScheduleClick: (schedule: Schedule) => void;
  isShowCreateNewModal: boolean;
  isShowEditModal: boolean;
  isShowDetailModal: boolean;
  isShowHolidayModal: boolean;
  selectedDay: Dayjs | null;
  selectedSchedule: Schedule | null;
  currentPageYear: number;
  currentPageMonth: number;
};

export default function MainPagePresentational({
  onBackMonthButtonClick,
  onNextMonthButtonClick,
  onCreateNewClick,
  onHolidayClick,
  onScheduleClick,
  isShowCreateNewModal,
  isShowEditModal,
  isShowDetailModal,
  isShowHolidayModal,
  selectedDay,
  selectedSchedule,
  currentPageYear,
  currentPageMonth,
}: MainPagePresentationalProps) {
  return (
    <>
      {isShowCreateNewModal && (
        <CreateNewModalContainer selectedDay={selectedDay} />
      )}
      {isShowEditModal && (
        <EditModalContainer selectedSchedule={selectedSchedule} />
      )}
      {isShowDetailModal && (
        <DetailModalContainer selectedSchedule={selectedSchedule} />
      )}
      {isShowHolidayModal && selectedDay && (
        <HolidayModalContainer selectedDay={selectedDay} />
      )}
      <CalendarHeader
        onBackMonthButtonClick={onBackMonthButtonClick}
        onNextMonthButtonClick={onNextMonthButtonClick}
        currentPageYear={currentPageYear}
        currentPageMonth={currentPageMonth}
      />
      <CalendarBody
        onCreateNewClick={onCreateNewClick}
        onHolidayClick={onHolidayClick}
        onScheduleClick={onScheduleClick}
        currentPageYear={currentPageYear}
        currentPageMonth={currentPageMonth}
      />
    </>
  );
}
