import type React from "react";
import { useState, useContext } from "react";
import YearMonthContext from "./context/context";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import validate from "./validation";

export default function EventModal() {
  // スウェーデンの日付形式で、今日をYYYY-MM-DDで取ってくる
  const today = new Date().toLocaleDateString("sv-SE");

  const { setShowModal, dispatchCalEvent } = useContext(YearMonthContext);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

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

    // バリデーション処理,エラーメッセージを受けとる
    const errorMessage = validate(calendarEvent);

    const titleStyle = document.getElementById("title");
    const dateStyle = document.getElementById("date");
    const startTimeStyle = document.getElementById("startTime");
    const endTimeStyle = document.getElementById("endTime");
    const memoStyle = document.getElementById("memo");
    const titleError = document.getElementById("titleError");
    const dateError = document.getElementById("dateError");
    const startTimeError = document.getElementById("startTimeError");
    const endTimeError = document.getElementById("endTimeError");
    const memoError = document.getElementById("memoError");
    const titleErrorMessage = document.getElementById("titleErrorMessage");
    const dateErrorMessage = document.getElementById("dateErrorMessage");
    const startTimeErrorMessage = document.getElementById(
      "startTimeErrorMessage"
    );
    const endTimeErrorMessage = document.getElementById("endTimeErrorMessage");
    const memoErrorMessage = document.getElementById("memoErrorMessage");

    // nullReturn
    if (
      titleStyle == null ||
      dateStyle == null ||
      startTimeStyle == null ||
      endTimeStyle == null ||
      memoStyle == null ||
      titleError == null ||
      dateError == null ||
      startTimeError == null ||
      endTimeError == null ||
      memoError == null ||
      titleErrorMessage == null ||
      dateErrorMessage == null ||
      startTimeErrorMessage == null ||
      endTimeErrorMessage == null ||
      memoErrorMessage == null
    ) {
      return;
    }

    // バリデーションエラー時にスタイルを変更する
    if (errorMessage.title != "") {
      titleStyle.style.border = "1px solid #ff0000";
      titleError.style.display = "flex";
      titleErrorMessage.innerHTML = errorMessage.title;
    } else {
      titleStyle.style.border = "1px solid #000000";
      titleError.style.display = "none";
    }
    if (errorMessage.date != "") {
      dateStyle.style.border = "1px solid #ff0000";
      dateError.style.display = "flex";
      dateErrorMessage.innerHTML = errorMessage.date;
    } else {
      dateStyle.style.border = "1px solid #000000";
      dateError.style.display = "none";
    }
    if (errorMessage.startTime != "") {
      startTimeStyle.style.border = "1px solid #ff0000";
      startTimeError.style.display = "flex";
      startTimeErrorMessage.innerHTML = errorMessage.startTime;
    } else {
      startTimeStyle.style.border = "1px solid #000000";
      startTimeError.style.display = "none";
    }
    if (errorMessage.endTime != "") {
      endTimeStyle.style.border = "1px solid #ff0000";
      endTimeError.style.display = "flex";
      endTimeErrorMessage.innerHTML = errorMessage.endTime;
    } else {
      endTimeStyle.style.border = "1px solid #000000";
      endTimeError.style.display = "none";
    }
    if (errorMessage.memo != "") {
      memoStyle.style.border = "1px solid #ff0000";
      memoError.style.display = "flex";
      memoErrorMessage.innerHTML = errorMessage.memo;
    } else {
      memoStyle.style.border = "1px solid #000000";
      memoError.style.display = "none";
    }

    // エラーメッセージが何もないときsubmit処理が行われる
    if (
      errorMessage.title == "" &&
      errorMessage.date == "" &&
      errorMessage.startTime == "" &&
      errorMessage.endTime == "" &&
      errorMessage.memo == ""
    ) {
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
              id="title"
              type="text"
              placeholder="タイトルを入力"
              className="title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <span id="titleError" className="error">
              <button className="caution">
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="titleErrorMessage"></span>
            </span>
          </div>
          <div>
            <input
              id="date"
              type="date"
              value={date}
              min={today}
              max={"9999-12-31"}
              className="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <span id="dateError" className="error">
              <button className="caution">
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="dateErrorMessage"></span>
            </span>
          </div>
          <div>
            <input
              id="startTime"
              type="time"
              placeholder="--:--"
              className="startTime"
              onChange={(e) => setStartTime(e.target.value)}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
              className="endTime"
              onChange={(e) => setEndTime(e.target.value)}
            />
            <span id="startTimeError" className="error">
              <button className="caution">
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="startTimeErrorMessage"></span>
            </span>
            <span id="endTimeError" className="error">
              <button className="caution">
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="endTimeErrorMessage"></span>
            </span>
          </div>
          <div>
            <textarea
              id="memo"
              placeholder="メモ"
              className="memo"
              onChange={(e) => setMemo(e.target.value)}
            ></textarea>
            <span id="memoError" className="error">
              <button className="caution">
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="memoErrorMessage"></span>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
