import dayjs from "dayjs";
import { GoClock } from "react-icons/go";
import { IoIosCalendar } from "react-icons/io";
import {
  IoPencil,
  IoTrash,
  IoCloseSharp,
  IoNewspaperOutline,
} from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import type { Schedule } from "~/types/types";

type Props = {
  confirmDialog: React.ReactNode | undefined;
  selectedSchedule: Schedule;
  onOutOfModalClick: () => void;
  onEditButtonClick: () => void;
  onTrashButtonClick: () => void;
  onCloseButtonClick: () => void;
};

export const DetailModalPresentational = ({
  confirmDialog,
  selectedSchedule,
  onOutOfModalClick,
  onEditButtonClick,
  onTrashButtonClick,
  onCloseButtonClick,
}: Props) => {
  const handleClickOutOfModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onOutOfModalClick();
    }
  };

  return (
    <>
      {/**モーダルの外側*/}
      <div className="outOfModal" onClick={handleClickOutOfModal}>
        <div className="detailModal">
          <header>
            <span className="detailHeader">予定の確認</span>
            <button className="headerIcons" onClick={onEditButtonClick}>
              <IoPencil />
            </button>
            <button className="headerIcons" onClick={onTrashButtonClick}>
              <IoTrash />
            </button>
            <button className="headerIcons" onClick={onCloseButtonClick}>
              <IoCloseSharp />
            </button>
          </header>

          <div className="readOnlyTitle">
            <span className="icons">
              <MdTitle size={25} />
            </span>
            <span className="title">：{selectedSchedule.title}</span>
          </div>
          <div className="readOnlyDate">
            <span className="icons">
              <IoIosCalendar size={25} />
            </span>
            <span className="date">
              ：{dayjs(selectedSchedule.date).format("YYYY-MM-DD")}
            </span>
          </div>
          <div className="readOnlyTime">
            <span className="icons">
              <GoClock size={25} />
            </span>
            <span className="time">
              ：{selectedSchedule.startTime}~{selectedSchedule.endTime}
            </span>
          </div>
          <div className="readOnlyMemo">
            <span className="icons">
              <IoNewspaperOutline size={25} />
            </span>
            <span className="memo">：{selectedSchedule.memo}</span>
          </div>
        </div>
      </div>
      {confirmDialog}
    </>
  );
};
