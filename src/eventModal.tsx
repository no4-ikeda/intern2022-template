import type React from "react";
import { useState, useContext } from "react";
import YearMonthContext from "./context/context";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

export default function EventModal() {
  const { setShowModal, dispatchCalEvent } = useContext(YearMonthContext);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  const message = document.querySelector(".title");

  // 保存ボタンが押されたとき、内容を格納する
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const calendarEvent = {
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      memo: memo,
      id: Date.now(),
    };
    if (!title || !date || !startTime || !endTime || !memo) {
      return;
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
      setShowModal(false);
    }
  };

  return (
    <>
      {/**モーダルの外側を押したときモーダルを消す*/}
      <div
        className="outOfModal"
        onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
      >
        {/**モーダル内容 */}
        <form className="createNewModal">
          <header className="modalHeader">
            <span className="eventHeader">予定の作成</span>
            <button
              className="headerIcons"
              type="submit"
              onClick={handleSubmit}
            >
              <FaCheck />
            </button>
            <button className="headerIcons" onClick={() => setShowModal(false)}>
              <IoCloseSharp />
            </button>
          </header>
          <div>
            <input
              type="text"
              name="title"
              placeholder="タイトルを入力"
              value={title}
              required
              minLength={2}
              className="title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <span className="error"></span>
          </div>
          <div>
            <input
              type="date"
              pattern="^[0-9]{4}/[0-9]{2}/[0-9]{2}"
              value={date}
              required
              aria-invalid="true"
              className="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <span className="error"></span>
          </div>
          <div>
            <input
              type="time"
              placeholder="--:--"
              className="startTime"
              value={startTime}
              required
              aria-invalid="true"
              onChange={(e) => setStartTime(e.target.value)}
            />
            ~
            <input
              type="time"
              placeholder="--:--"
              className="endTime"
              value={endTime}
              required
              aria-invalid="true"
              onChange={(e) => setEndTime(e.target.value)}
            />
            <span className="error"></span>
          </div>
          <div>
            <textarea
              placeholder="memo"
              className="memo"
              value={memo}
              required
              aria-invalid="true"
              onChange={(e) => setMemo(e.target.value)}
            ></textarea>
            <span className="error"></span>
          </div>
        </form>
      </div>
    </>
  );
}
