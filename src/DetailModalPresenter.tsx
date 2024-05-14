import { GoClock } from "react-icons/go";
import { IoIosCalendar } from "react-icons/io";
import {
  IoPencil,
  IoTrash,
  IoCloseSharp,
  IoNewspaperOutline,
} from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import type { DetailModalPresenterProps } from "./types/types";

export default function DetailModalPresenter({
  handleClickOutOfModal,
  handleClickEdit,
  handleClickTrash,
  handleClickClose,
  selectedSchedule,
}: DetailModalPresenterProps) {
  return (
    <>
      {/**モーダルの外側を押したときモーダルを消す*/}
      <div className="outOfModal" onClick={(e) => handleClickOutOfModal(e)}>
        <div className="detailModal">
          <header>
            <span className="detailHeader">予定の確認</span>
            <button className="headerIcons" onClick={handleClickEdit}>
              <IoPencil />
            </button>
            <button
              className="headerIcons"
              type="submit"
              onClick={handleClickTrash}
            >
              <IoTrash />
            </button>
            <button className="headerIcons" onClick={handleClickClose}>
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
            <span className="date">：{selectedSchedule.date}</span>
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
