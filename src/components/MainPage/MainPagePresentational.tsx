import { CalendarBody } from "./parts/Calendar/CalendarBody";
import { CalendarHeader } from "./parts/Calendar/CalendarHeader";
import { DetailModalContainer } from "./modal/DetailModalContainer";
import { HolidayModalContainer } from "./modal/HolidayModalContainer";
import type { Dayjs } from "dayjs";
import type { Schedule } from "~/types/types";
import type dayjs from "dayjs";
import { InputModalContainer } from "./modal/InputModalContainer";
import { useModalState } from "~/hooks/useModalState";

type Props = {
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

export const MainPagePresentational = ({
  selectedDay,
  selectedSchedule,
  currentPageYear,
  currentPageMonth,
  onBackMonthButtonClick,
  onNextMonthButtonClick,
  onCreateNewClick,
  onHolidayClick,
  onScheduleClick,
}: Props) => {
  const [isDetailModalOpen] = useModalState("detail");
  const [isHolidayModalOpen] = useModalState("holiday");
  const [isInputModalOpen] = useModalState("input");
  return (
    <>
      {isDetailModalOpen && (
        <DetailModalContainer selectedSchedule={selectedSchedule} />
      )}
      {isHolidayModalOpen && selectedDay && (
        <HolidayModalContainer selectedDay={selectedDay} />
      )}
      {isInputModalOpen && (
        <InputModalContainer
          selectedDay={selectedDay}
          selectedSchedule={selectedSchedule}
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
