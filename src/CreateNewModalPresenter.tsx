import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import type { CreateNewModalPresenterProps } from "./types/types";
import {
  TitleErrorMessageContainer,
  DateErrorMessageContainer,
  MemoErrorMessageContainer,
  EndTimeErrorMessageContainer,
  StartTimeErrorMessageContainer,
} from "./ErrorMessageContainer";

export default function CreateNewModalPresenter({
  handleOutOfModalClick,
  handleSaveButtonClick,
  handleCloseButtonClick,
  handleTitleChange,
  handleDateChange,
  handleStartTimeChange,
  handleEndTimeChange,
  handleMemoChange,
  date,
  today,
  titleError,
  dateError,
  startTimeError,
  endTimeError,
  memoError,
}: CreateNewModalPresenterProps) {
  return (
    <>
      <div className="outOfModal" onClick={(e) => handleOutOfModalClick(e)}>
        {/**モーダル内容 */}
        <div className="createNewModal">
          <header>
            <span className="eventHeader">予定の作成</span>
            <button
              className="headerIcons"
              type="submit"
              onClick={handleSaveButtonClick}
            >
              <FaCheck />
            </button>
            <button className="headerIcons" onClick={handleCloseButtonClick}>
              <IoCloseSharp />
            </button>
          </header>
          <div>
            <input
              id="title"
              type="text"
              placeholder="タイトルを入力"
              className={titleError ? "invalidTitle" : "validTitle"}
              onChange={(e) => handleTitleChange(e)}
            ></input>
            {titleError && (
              <TitleErrorMessageContainer titleError={titleError} />
            )}
          </div>
          <div>
            <input
              id="date"
              type="date"
              value={date}
              min={today}
              max={"9999-12-31"}
              className={dateError ? "invalidDate" : "validDate"}
              onChange={(e) => handleDateChange(e)}
            />
            {dateError && <DateErrorMessageContainer dateError={dateError} />}
          </div>
          <div>
            <input
              id="startTime"
              type="time"
              placeholder="--:--"
              className={startTimeError ? "invalidStartTime" : "validStartTime"}
              onChange={(e) => handleStartTimeChange(e)}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
              className={endTimeError ? "invalidEndTime" : "validEndTime"}
              onChange={(e) => handleEndTimeChange(e)}
            />
            {startTimeError && (
              <StartTimeErrorMessageContainer startTimeError={startTimeError} />
            )}
            {endTimeError && (
              <EndTimeErrorMessageContainer endTimeError={endTimeError} />
            )}
          </div>
          <div>
            <textarea
              id="memo"
              placeholder="memo"
              className={memoError ? "invalidMemo" : "validMemo"}
              onChange={(e) => handleMemoChange(e)}
            ></textarea>
            {memoError && <MemoErrorMessageContainer memoError={memoError} />}
          </div>
        </div>
      </div>
    </>
  );
}
