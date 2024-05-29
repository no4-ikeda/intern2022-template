import { useRecoilState, type SetterOrUpdater } from "recoil";
import { modalStateAtom } from "~/atoms/modalStateAtom";

type Response = [boolean, SetterOrUpdater<boolean>];

type ModalType = "detail" | "holiday" | "input";

export const useModalState = (modalType: ModalType): Response => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    modalStateAtom(modalType)
  );

  return [isModalOpen, setIsModalOpen];
};
