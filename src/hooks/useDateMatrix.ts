import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { useMemo } from "react";

dayjs.locale(ja);

export const useDateMatrix = (
  currentPageYear: number,
  currentPageMonth: number
) => {
  const dateMatrix: dayjs.Dayjs[] = useMemo(() => {
    // 月の最終日を取得
    const numberOfDaysInMonth = Number(
      dayjs(new Date(currentPageYear, currentPageMonth))
        .endOf("month")
        .format("D")
    );

    // カレンダーの先頭・末尾の隙間を埋めるための先月、来月の情報
    const firstDayOfWeekOfMonth = dayjs(
      new Date(currentPageYear, currentPageMonth, 1)
    ).day();
    const lastDayOfWeekOfMonth = dayjs(
      new Date(currentPageYear, currentPageMonth, numberOfDaysInMonth)
    ).day();
    let startDateOfCalendar = 0 - firstDayOfWeekOfMonth;
    const nextMonthDate = 6 - lastDayOfWeekOfMonth;

    // numberOfDaysInMonth:1ヶ月の日数
    // nextMonthDate:カレンダーページ内の来月分の日数
    // firstDayOfWeekOfMonth:カレンダーページ内の先月分の日数
    // 3つの合計が取ってくる日数の合計
    const calendarMatrix: dayjs.Dayjs[] = [];
    for (
      let day = 0;
      day < numberOfDaysInMonth + nextMonthDate + firstDayOfWeekOfMonth;
      day++
    ) {
      startDateOfCalendar++;
      calendarMatrix[day] = dayjs(
        new Date(currentPageYear, currentPageMonth, startDateOfCalendar)
      );
    }

    return calendarMatrix;
  }, [currentPageYear, currentPageMonth]);
  return dateMatrix;
};
