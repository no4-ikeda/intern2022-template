import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { savedScheduleSelector } from "~/atoms/saveScheduleSelector";
import type { Action } from "~/types/types";

export const useOperateSchedule = () => {
  const setSaveSchedule = useSetRecoilState(savedScheduleSelector);
  const operateSchedule = useCallback(
    ({ type, payload }: Action) => {
      setSaveSchedule({
        savedSchedules: [],
        type: type,
        payload: payload,
      });
    },
    [setSaveSchedule]
  );
  return operateSchedule;
};
