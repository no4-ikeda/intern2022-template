import { CalendarBody } from "./parts/Calendar/CalendarBody";
import { CalendarHeader } from "./parts/Calendar/CalendarHeader";
import { DetailModalContainer } from "./modal/DetailModalContainer";
import { HolidayModalContainer } from "./modal/HolidayModalContainer";
import type { Dayjs } from "dayjs";
import type { Schedule } from "~/types/types";
import type dayjs from "dayjs";
import { InputModalContainer } from "./modal/InputModalContainer";

type Props = {
  isOpenDetailModal: boolean;
  isOpenHolidayModal: boolean;
  isOpenInputModal: boolean;
  selectedDay: Dayjs | null;
  selectedSchedule: Schedule | null;
  currentPageYear: number;
  currentPageMonth: number;
  openInputModal: () => void;
  closeDetailModal: () => void;
  closeHolidayModal: () => void;
  closeInputModal: () => void;
  onBackMonthButtonClick: () => void;
  onNextMonthButtonClick: () => void;
  onCreateNewClick: (date: dayjs.Dayjs) => void;
  onHolidayClick: (date: dayjs.Dayjs) => void;
  onScheduleClick: (schedule: Schedule) => void;
};

export const MainPagePresentational = ({
  isOpenDetailModal,
  isOpenHolidayModal,
  isOpenInputModal,
  selectedDay,
  selectedSchedule,
  currentPageYear,
  currentPageMonth,
  openInputModal,
  closeDetailModal,
  closeHolidayModal,
  closeInputModal,
  onBackMonthButtonClick,
  onNextMonthButtonClick,
  onCreateNewClick,
  onHolidayClick,
  onScheduleClick,
}: Props) => {
  return (
    <>
      {isOpenDetailModal && (
        <DetailModalContainer
          selectedSchedule={selectedSchedule}
          openInputModal={openInputModal}
          closeDetailModal={closeDetailModal}
        />
      )}
      {isOpenHolidayModal && selectedDay && (
        <HolidayModalContainer
          selectedDay={selectedDay}
          closeHolidayModal={closeHolidayModal}
        />
      )}
      {isOpenInputModal && (
        <InputModalContainer
          selectedDay={selectedDay}
          selectedSchedule={selectedSchedule}
          closeInputModal={closeInputModal}
        />
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
};
