import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import { useMemo } from "react";

dayjs.locale(ja);

export function useDateMatrix(currentPageMonth = dayjs().month()) {
  const dateMatrix: dayjs.Dayjs[] = useMemo(() => {
    // 現在の年を取得
    const year = dayjs().year();

    // 月の最終日を取得
    const lastOfMonth = Number(
      dayjs(new Date(year, currentPageMonth)).endOf("month").format("D")
    );

    // カレンダーの先頭・末尾の隙間を埋めるための先月、来月の情報
    const firstDayOfWeekOfMonth = dayjs(
      new Date(year, currentPageMonth, 1)
    ).day();
    const lastDayOfWeekOfMonth = dayjs(
      new Date(year, currentPageMonth, lastOfMonth)
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
        new Date(year, currentPageMonth, topOfCalendar)
      );
    }

    return calendarMatrix;
  }, [currentPageMonth]);
  return dateMatrix;
}
