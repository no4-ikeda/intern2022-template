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
