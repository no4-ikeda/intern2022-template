import type React from "react";
import { useState, useContext, useCallback } from "react";
import YearMonthContext from "./context/Context";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import validate from "./hooks/useValidation";

export default function CreateNewModal() {
  // スウェーデンの日付形式で、今日をYYYY-MM-DDで取ってくる
  const today = new Date().toLocaleDateString("sv-SE");

  const { setIsShowCreateNewModal, dispatchCalEvent } =
    useContext(YearMonthContext);
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(today);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  // 送信ボタンが押されたとき
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

    const isCalendarEventValid = validate(calendarEvent);
    // エラーメッセージが何もないときsubmit処理が行われる
    if (isCalendarEventValid) {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
      setIsShowCreateNewModal(false);
    }
  };

  // モーダルの外側を押したときモーダルを消す
  const handleClickOutOfModal = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.target === e.currentTarget && setIsShowCreateNewModal(false);
    },
    [setIsShowCreateNewModal]
  );

  // ×ボタンが押されたとき
  const handleClickClose = useCallback(() => {
    setIsShowCreateNewModal(false);
  }, [setIsShowCreateNewModal]);

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

  return (
    <>
      <div className="outOfModal" onClick={(e) => handleClickOutOfModal(e)}>
        {/**モーダル内容 */}
        <form className="createNewModal">
          <header>
            <span className="eventHeader">予定の作成</span>
            <button
              className="headerIcons"
              type="submit"
              onClick={handleSubmit}
            >
              <FaCheck />
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
              className="startTime"
              onChange={(e) => handleChangeStartTime(e)}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
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
