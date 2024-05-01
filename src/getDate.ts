import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfWeekOfMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfWeekOfMonth;
  const dayMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return dayMatrix;
}
