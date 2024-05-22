import { CalendarBody } from "./parts/Calendar/CalendarBody";
import CalendarHeader from "./parts/Calendar/CalendarHeader";
import CreateNewModalContainer from "./modal/CreateNewModalContainer";
import EditModalContainer from "./modal/EditModalContainer";
import DetailModalContainer from "./modal/DetailModalContainer";
import HolidayModalContainer from "./modal/HolidayModalContainer";
import type { Dayjs } from "dayjs";
import type { Schedule } from "~/types/types";
import type dayjs from "dayjs";

type Props = {
  isShowCreateNewModal: boolean;
  isShowEditModal: boolean;
  isShowDetailModal: boolean;
  isShowHolidayModal: boolean;
  selectedDay: Dayjs | null;
  selectedSchedule: Schedule | null;
  currentPageYear: number;
  currentPageMonth: number;
  onBackMonthButtonClick: () => void;
  onNextMonthButtonClick: () => void;
  onCreateNewClick: (date: dayjs.Dayjs) => void;
  onHolidayClick: (date: dayjs.Dayjs) => void;
  onScheduleClick: (schedule: Schedule) => void;
};

export default function MainPagePresentational({
  isShowCreateNewModal,
  isShowEditModal,
  isShowDetailModal,
  isShowHolidayModal,
  selectedDay,
  selectedSchedule,
  currentPageYear,
  currentPageMonth,
  onBackMonthButtonClick,
  onNextMonthButtonClick,
  onCreateNewClick,
  onHolidayClick,
  onScheduleClick,
}: Props) {
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
        currentPageYear={currentPageYear}
        currentPageMonth={currentPageMonth}
        onBackMonthButtonClick={onBackMonthButtonClick}
        onNextMonthButtonClick={onNextMonthButtonClick}
      />
      <CalendarBody
        currentPageYear={currentPageYear}
        currentPageMonth={currentPageMonth}
        onCreateNewClick={onCreateNewClick}
        onHolidayClick={onHolidayClick}
        onScheduleClick={onScheduleClick}
      />
    </>
  );
}
