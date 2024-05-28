import dayjs from "dayjs";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { holidayListAtom } from "~/atoms/holidayListAtom";
import type { Holiday } from "~/types/types";
type HolidayInfo = {
  [key: string]: string;
};

export const useFetchHolidayList = (indicatedYear: number) => {
  const setHolidayList = useSetRecoilState(holidayListAtom);

  const urlTop = "https://holidays-jp.github.io/api/v1/";
  const urlBottom = "/date.json";
  const year: string = indicatedYear.toString();
  const url = urlTop + year + urlBottom;

  useEffect(() => {
    const fetchHolidayList = async () => {
      const response = await fetch(url);
      const holidayInfo = (await response.json()) as HolidayInfo;

      const holidayInfoKeys: string[] = Object.keys(holidayInfo);
      const holidayInfoValues: string[] = Object.values(holidayInfo);

      const holidayList: Holiday[] = holidayInfoKeys.map(
        (holidayInfoKey, idx) => {
          return {
            date: dayjs(holidayInfoKey),
            text: holidayInfoValues[idx],
          };
        }
      );

      setHolidayList(holidayList);
    };

    void fetchHolidayList();
  }, [setHolidayList, url]);
};
