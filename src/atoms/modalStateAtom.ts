import { atomFamily } from "recoil";

export const modalStateAtom = atomFamily({
  key: "modalStateAtom",
  default: false,
});
