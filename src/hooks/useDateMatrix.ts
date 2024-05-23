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
    const lastOfMonth = Number(
      dayjs(new Date(currentPageYear, currentPageMonth))
        .endOf("month")
        .format("D")
    );

    // カレンダーの先頭・末尾の隙間を埋めるための先月、来月の情報
    const firstDayOfWeekOfMonth = dayjs(
      new Date(currentPageYear, currentPageMonth, 1)
    ).day();
    const lastDayOfWeekOfMonth = dayjs(
      new Date(currentPageYear, currentPageMonth, lastOfMonth)
    ).day();
    let topOfCalendar = 0 - firstDayOfWeekOfMonth;
    const lastOfCalendar = 6 - lastDayOfWeekOfMonth;

    // lastOfMonth:1ヶ月の日数
    // lastOfCalendar:カレンダーページ内の来月分の日数
    // firstDayOfWeekOfMonth:カレンダーページ内の先月分の日数
    // 3つの合計が取ってくる日数の合計
    const calendarMatrix: dayjs.Dayjs[] = [];
    for (
      let day = 0;
      day < lastOfMonth + lastOfCalendar + firstDayOfWeekOfMonth;
      day++
    ) {
      topOfCalendar++;
      calendarMatrix[day] = dayjs(
        new Date(currentPageYear, currentPageMonth, topOfCalendar)
      );
    }

    return calendarMatrix;
  }, [currentPageYear, currentPageMonth]);
  return dateMatrix;
};
