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

type DetailModalPresentationalProps = {
  onOutOfModalClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onEditButtonClick: () => void;
  onTrashButtonClick: () => void;
  onCloseButtonClick: () => void;
  selectedSchedule: Schedule;
};

export default function DetailModalPresentational({
  onOutOfModalClick,
  onEditButtonClick,
  onTrashButtonClick,
  onCloseButtonClick,
  selectedSchedule,
}: DetailModalPresentationalProps) {
  return (
    <>
      {/**モーダルの外側を押したときモーダルを消す*/}
      <div className="outOfModal" onClick={onOutOfModalClick}>
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

          <div className="detailTitle">
            <span className="icons">
              <MdTitle size={25} />
            </span>
            <span className="title">：{selectedSchedule.title}</span>
          </div>
          <div className="detailDate">
            <span className="icons">
              <IoIosCalendar size={25} />
            </span>
            <span className="date">
              ：{dayjs(selectedSchedule.date).format("YYYY-MM-DD")}
            </span>
          </div>
          <div className="detailTime">
            <span className="icons">
              <GoClock size={25} />
            </span>
            <span className="time">
              ：{selectedSchedule.startTime}~{selectedSchedule.endTime}
            </span>
          </div>
          <div className="detailMemo">
            <span className="icons">
              <IoNewspaperOutline size={25} />
            </span>
            <span className="memo">：{selectedSchedule.memo}</span>
          </div>
        </div>
      </div>
    </>
  );
}
