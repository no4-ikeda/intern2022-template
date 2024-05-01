import { useContext, useMemo } from "react";
import YearMonthContext from "~/context/context";

export default function useFetchHoliday(indicatedYear: number) {
  const { holiday, setHoliday } = useContext(YearMonthContext);

  const urlTop = "https://holidays-jp.github.io/api/v1/";
  const urlBottom = "/date.json";
  const year: string = indicatedYear.toString();
  const url = urlTop + year + urlBottom;

  useMemo(() => {
    const fetchHoliday = async () => {
      const response = await fetch(url);
      const holidays = (await response.json()) as string[];
      setHoliday(holidays);
    };
    void fetchHoliday();
  }, [setHoliday, url]);

  return holiday;
}

// export type Fetch = {
//   holiday: string;
// };

// export default function GetHoliday(yearIndicated: number) {
//   const urlTop = "https://holidays-jp.github.io/api/v1/";
//   const urlBottom = "/date.json";
//   const year: string = yearIndicated.toString();
//   const url = urlTop + year + urlBottom;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       return data as Fetch[];
//     })
//     .catch(() => alert("error"));
// }

// export default async function GetHoliday(yearIndicated: number) {
//   const urlTop = "https://holidays-jp.github.io/api/v1/";
//   const urlBottom = "/date.json";
//   const year: string = yearIndicated.toString();
//   const url = urlTop + year + urlBottom;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("ネットワークのエラーまたはデータの取得に失敗しました。");
//   }
//   const holidays: Fetch[] = (await response.json()) as Fetch[];

//   return holidays;
// }
