import { useContext } from "react";
import { IoCloseSharp, IoTrash } from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import YearMonthContext from "./context/context";
import { IoIosCalendar } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";

export default function DetailModal() {
  const {
    setShowEditModal,
    setShowDetailModal,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(YearMonthContext);
  if (selectedEvent == null) {
    return null;
  }
  return (
    <>
      {/**モーダルの外側を押したときモーダルを消す*/}
      <div
        className="outOfModal"
        onClick={(e) =>
          e.target === e.currentTarget && setShowDetailModal(false)
        }
      >
        <div className="detailModal">
          <header>
            <span className="detailHeader">予定の確認</span>
            <button
              className="headerIcons"
              onClick={() => {
                setShowDetailModal(false);
                setShowEditModal(true);
              }}
            >
              <IoPencil />
            </button>
            <button
              className="headerIcons"
              type="submit"
              onClick={() => {
                dispatchCalEvent({ type: "delete", payload: selectedEvent });
                setShowDetailModal(false);
              }}
            >
              <IoTrash />
            </button>
            <button
              className="headerIcons"
              onClick={() => setShowDetailModal(false)}
            >
              <IoCloseSharp />
            </button>
          </header>

          <div className="detailTitle">
            <span className="icons">
              <MdTitle size={25} />
            </span>
            <span className="title">：{selectedEvent.title}</span>
          </div>
          <div className="detailDate">
            <span className="icons">
              <IoIosCalendar size={25} />
            </span>
            <span className="date">：{selectedEvent.date}</span>
          </div>
          <div className="detailTime">
            <span className="icons">
              <GoClock size={25} />
            </span>
            <span className="time">
              ：{selectedEvent.startTime}~{selectedEvent.endTime}
            </span>
          </div>
          <div className="detailMemo">
            <span className="icons">
              <IoNewspaperOutline size={25} />
            </span>
            <span className="memo">：{selectedEvent.memo}</span>
          </div>
        </div>
      </div>
    </>
  );
}
