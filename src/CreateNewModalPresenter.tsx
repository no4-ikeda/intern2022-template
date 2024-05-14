import { FaCheck } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import type { CreateNewModalPresenterProps } from "./types/types";

export default function CreateNewModalPresenter({
  handleClickOutOfModal,
  handleSubmit,
  handleClickClose,
  handleChangeTitle,
  handleChangeDate,
  handleChangeStartTime,
  handleChangeEndTime,
  handleChangeMemo,
  date,
  today,
  errorMessageTitle,
  errorMessageDate,
  errorMessageStartTime,
  errorMessageEndTime,
  errorMessageMemo,
}: CreateNewModalPresenterProps) {
  return (
    <>
      <div className="outOfModal" onClick={(e) => handleClickOutOfModal(e)}>
        {/**モーダル内容 */}
        <div className="createNewModal">
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
