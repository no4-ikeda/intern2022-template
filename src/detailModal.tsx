import { useCallback, useContext } from "react";
import { IoCloseSharp, IoTrash } from "react-icons/io5";
import { MdTitle } from "react-icons/md";
import YearMonthContext from "./context/Context";
import { IoIosCalendar } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";

export default function DetailModal() {
  const {
    setIsShowEditModal,
    setIsShowDetailModal,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(YearMonthContext);

  // モーダルの外側を押したときモーダルを消す
  const handleClickOutOfModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowDetailModal(false);
    },
    [setIsShowDetailModal]
  );

  // 編集、削除、クローズボタンが押されたとき
  const handleClickEdit = useCallback(() => {
    setIsShowDetailModal(false);
    setIsShowEditModal(true);
  }, [setIsShowDetailModal, setIsShowEditModal]);

  const handleClickTrash = useCallback(() => {
    if (selectedEvent == null) {
      return null;
    }
    dispatchCalEvent({ type: "delete", payload: selectedEvent });
    setIsShowDetailModal(false);
  }, [dispatchCalEvent, selectedEvent, setIsShowDetailModal]);

  const handleClickClose = useCallback(() => {
    setIsShowDetailModal(false);
  }, [setIsShowDetailModal]);

  if (selectedEvent == null) {
    return null;
  }
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
