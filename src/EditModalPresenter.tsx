import { FaCheck } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { IoTrash, IoCloseSharp } from "react-icons/io5";
import type { EditModalPresenterProps } from "./types/types";

export default function EditModalPresenter({
  handleClickOutOfModal,
  handleSubmit,
  handleClickTrash,
  handleClickClose,
  handleChangeTitle,
  handleChangeDate,
  handleChangeStartTime,
  handleChangeEndTime,
  handleChangeMemo,
  today,
  errorMessageTitle,
  errorMessageDate,
  errorMessageStartTime,
  errorMessageEndTime,
  errorMessageMemo,
  title,
  date,
  startTime,
  endTime,
  memo,
}: EditModalPresenterProps) {
  return (
    <>
      <div className="outOfModal" onClick={(e) => handleClickOutOfModal(e)}>
        <div className="editModal">
          <header>
            <span className="editHeader">予定の編集</span>
            <button
              className="headerIcons"
              type="submit"
              onClick={handleSubmit}
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
              className={errorMessageTitle ? "invalidTitle" : "validTitle"}
              onChange={(e) => handleChangeTitle(e)}
            ></input>
            <span
              id="titleError"
              className={errorMessageTitle ? "isError" : "isNormally"}
            >
              <button
                className={
                  errorMessageTitle ? "isErrorCaution" : "isNormallyCaution"
                }
              >
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="titleErrorMessage">{errorMessageTitle}</span>
            </span>
          </div>
          <div>
            <input
              id="date"
              type="date"
              value={date}
              min={today}
              max={"9999-12-31"}
              className={errorMessageDate ? "invalidDate" : "validDate"}
              onChange={(e) => handleChangeDate(e)}
            />
            <span
              id="dateError"
              className={errorMessageDate ? "isError" : "isNormally"}
            >
              <button
                className={
                  errorMessageDate ? "isErrorCaution" : "isNormallyCaution"
                }
              >
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="dateErrorMessage">{errorMessageDate}</span>
            </span>
          </div>
          <div>
            <input
              id="startTime"
              type="time"
              placeholder="--:--"
              value={startTime}
              className={
                errorMessageStartTime ? "invalidStartTime" : "validStartTime"
              }
              onChange={(e) => handleChangeStartTime(e)}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
              value={endTime}
              className={
                errorMessageEndTime ? "invalidEndTime" : "validEndTime"
              }
              onChange={(e) => handleChangeEndTime(e)}
            />
            <span
              id="startTimeError"
              className={errorMessageStartTime ? "isError" : "isNormally"}
            >
              <button
                className={
                  errorMessageStartTime ? "isErrorCaution" : "isNormallyCaution"
                }
              >
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="startTimeErrorMessage">{errorMessageStartTime}</span>
            </span>
            <span
              id="endTimeError"
              className={errorMessageEndTime ? "isError" : "isNormally"}
            >
              <button
                className={
                  errorMessageEndTime ? "isErrorCaution" : "isNormallyCaution"
                }
              >
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="endTimeErrorMessage">{errorMessageEndTime}</span>
            </span>
          </div>
          <div>
            <textarea
              id="memo"
              placeholder="memo"
              value={memo}
              className={errorMessageMemo ? "invalidMemo" : "validMemo"}
              onChange={(e) => handleChangeMemo(e)}
            ></textarea>
            <span
              id="memoError"
              className={errorMessageMemo ? "isError" : "isNormally"}
            >
              <button
                className={
                  errorMessageMemo ? "isErrorCaution" : "isNormallyCaution"
                }
              >
                <FiAlertTriangle color="#ff0000" />
              </button>
              <span id="memoErrorMessage">{errorMessageMemo}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
