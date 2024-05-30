import { CalendarBody } from "./parts/Calendar/CalendarBody";
import { CalendarHeader } from "./parts/Calendar/CalendarHeader";
import { DetailModalContainer } from "./modal/DetailModalContainer";
import { HolidayModalContainer } from "./modal/HolidayModalContainer";
import type { Dayjs } from "dayjs";
import type { Schedule } from "~/types/types";
import type dayjs from "dayjs";
import { InputModalContainer } from "./modal/InputModalContainer";

type Props = {
  isDetailModalOpen: boolean;
  isHolidayModalOpen: boolean;
  isInputModalOpen: boolean;
  selectedDay: Dayjs | null;
  selectedSchedule: Schedule | null;
  currentPageYear: number;
  currentPageMonth: number;
  onBackMonthButtonClick: () => void;
  onNextMonthButtonClick: () => void;
  onCreateNewClick: (date: dayjs.Dayjs) => void;
  onHolidayClick: (date: dayjs.Dayjs) => void;
  onScheduleClick: (schedule: Schedule) => void;
  onRequestCloseDetailModal: () => void;
  onRequestCloseHolidayModal: () => void;
  onRequestCloseInputModal: () => void;
  onRequestOpenInputModal: () => void;
};

export const MainPagePresentational = ({
  isDetailModalOpen,
  isHolidayModalOpen,
  isInputModalOpen,
  selectedDay,
  selectedSchedule,
  currentPageYear,
  currentPageMonth,
  onBackMonthButtonClick,
  onNextMonthButtonClick,
  onCreateNewClick,
  onHolidayClick,
  onScheduleClick,
  onRequestCloseDetailModal,
  onRequestCloseHolidayModal,
  onRequestCloseInputModal,
  onRequestOpenInputModal,
}: Props) => {
  return (
    <>
      {isDetailModalOpen && (
        <DetailModalContainer
          selectedSchedule={selectedSchedule}
          onRequestCloseDetailModal={onRequestCloseDetailModal}
          onRequestOpenInputModal={onRequestOpenInputModal}
        />
      )}
      {isHolidayModalOpen && selectedDay && (
        <HolidayModalContainer
          selectedDay={selectedDay}
          onRequestCloseHolidayModal={onRequestCloseHolidayModal}
        />
      )}
      {isInputModalOpen && (
        <InputModalContainer
          selectedDay={selectedDay}
          selectedSchedule={selectedSchedule}
          onRequestCloseInputModal={onRequestCloseInputModal}
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
