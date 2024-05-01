import type React from "react";
import { useState, useContext } from "react";
import YearMonthContext from "./context/context";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";

export default function EditModal() {
  const { setShowEditModal, dispatchCalEvent, selectedEvent } =
    useContext(YearMonthContext);

  const [title, setTitle] = useState<string>(
    selectedEvent ? selectedEvent.title : ""
  );
  const [date, setDate] = useState<string>(
    selectedEvent ? selectedEvent.date : ""
  );
  const [startTime, setStartTime] = useState<string>(
    selectedEvent ? selectedEvent.startTime : ""
  );
  const [endTime, setEndTime] = useState<string>(
    selectedEvent ? selectedEvent.endTime : ""
  );
  const [memo, setMemo] = useState<string>(
    selectedEvent ? selectedEvent.memo : ""
  );
  if (selectedEvent == null) {
    return null;
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const calendarEvent = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (!title || !date || !startTime || !endTime || !memo) {
      alert("必須項目が未入力です");
    } else if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
      setShowEditModal(false);
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
      setShowEditModal(false);
    }
  };
  return (
    <>
      {/**モーダルの外側を押したときモーダルを消す*/}
      <div
        className="outOfModal"
        onClick={(e) => e.target === e.currentTarget && setShowEditModal(false)}
      >
        <form className="editModal">
          <span className="editHeader">予定の編集</span>
          <button className="headerIcons" type="submit" onClick={handleSubmit}>
            <FaCheck />
          </button>
          <button
            className="headerIcons"
            type="submit"
            onClick={() => {
              dispatchCalEvent({ type: "delete", payload: selectedEvent });
              setShowEditModal(false);
            }}
          >
            <IoTrash />
          </button>
          <button
            className="headerIcons"
            onClick={() => setShowEditModal(false)}
          >
            <IoCloseSharp />
          </button>
          <div>
            <input
              type="text"
              name="title"
              placeholder="タイトルを入力"
              value={title}
              required
              className="title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              pattern="^[0-9]{4}/[0-9]{2}/[0-9]{2}"
              value={date}
              required
              className="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <input
              type="time"
              placeholder="--:--"
              className="startTime"
              value={startTime}
              required
              onChange={(e) => setStartTime(e.target.value)}
            />
            ~
            <input
              type="time"
              placeholder="--:--"
              className="endTime"
              value={endTime}
              required
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div>
            <textarea
              placeholder="memo"
              className="memo"
              value={memo}
              required
              onChange={(e) => setMemo(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
}
