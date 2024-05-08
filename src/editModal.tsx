import type React from "react";
import { useState, useContext, useCallback } from "react";
import YearMonthContext from "./context/Context";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import validate from "./hooks/useValidation";

export default function EditModal() {
  // スウェーデンの日付形式で、今日をYYYY-MM-DDで取ってくる
  const today = new Date().toLocaleDateString("sv-SE");

  const { setIsShowEditModal, dispatchCalEvent, selectedEvent } =
    useContext(YearMonthContext);

  // selectedEventがtrueならば初期値にイベントの中身を、falseなら空 */

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

  // モーダルの外側を押したときモーダルを消す
  const handleClickOutOfModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowEditModal(false);
    },
    [setIsShowEditModal]
  );

  // 削除、クローズボタンが押されたとき
  const handleClickTrash = useCallback(() => {
    if (selectedEvent == null) {
      return null;
    }
    dispatchCalEvent({ type: "delete", payload: selectedEvent });
    setIsShowEditModal(false);
  }, [dispatchCalEvent, selectedEvent, setIsShowEditModal]);

  const handleClickClose = useCallback(() => {
    setIsShowEditModal(false);
  }, [setIsShowEditModal]);

  // テキストボックスの値が変化したとき、Stateにセットされる
  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );
  const handleChangeDate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
    },
    []
  );
  const handleChangeStartTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartTime(e.target.value);
    },
    []
  );
  const handleChangeEndTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndTime(e.target.value);
    },
    []
  );
  const handleChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMemo(e.target.value);
    },
    []
  );

  if (selectedEvent == null) {
    return null;
  }

  // 送信ボタンを押されたとき

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

    const isCalendarEventValid = validate(calendarEvent);
    if (isCalendarEventValid) {
      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
        setIsShowEditModal(false);
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
        setIsShowEditModal(false);
      }
    }
  };

  return (
    <>
      <div className="outOfModal" onClick={(e) => handleClickOutOfModal(e)}>
        <form className="editModal">
          <header>
            <span className="editHeader">予定の編集</span>
            <button
              className="headerIcons"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              <FaCheck />
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

          <div>
            <input
              id="title"
              type="text"
              placeholder="タイトルを入力"
              value={title}
              className="title"
              onChange={(e) => handleChangeTitle(e)}
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
              onChange={(e) => handleChangeDate(e)}
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
              value={startTime}
              className="startTime"
              onChange={(e) => handleChangeStartTime(e)}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
              value={endTime}
              className="endTime"
              onChange={(e) => handleChangeEndTime(e)}
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
              placeholder="memo"
              value={memo}
              className="memo"
              onChange={(e) => handleChangeMemo(e)}
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
