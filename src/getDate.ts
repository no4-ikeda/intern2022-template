import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

export function getMonth(month = dayjs().month()) {
  {
    /** 現在の年を取得*/
  }
  const year = dayjs().year();

  {
    /** カレンダー1行目の左端の日にちを計算 */
  }
  const firstDayOfWeekOfMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfWeekOfMonth;

  {
    /** ６行７列で月の情報を取得 */
  }
  const dayMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return dayMatrix;
}
