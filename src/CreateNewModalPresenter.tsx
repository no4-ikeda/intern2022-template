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
  onOutOfModalClick,
  onSaveButtonClick,
  onCloseButtonClick,
  onTitleChange,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onMemoChange,
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
      <div className="outOfModal" onClick={(e) => onOutOfModalClick(e)}>
        {/**モーダル内容 */}
        <div className="createNewModal">
          <header>
            <span className="eventHeader">予定の作成</span>
            <button
              className="headerIcons"
              type="submit"
              onClick={onSaveButtonClick}
            >
              <FaCheck />
            </button>
            <button className="headerIcons" onClick={onCloseButtonClick}>
              <IoCloseSharp />
            </button>
          </header>
          <div>
            <input
              id="title"
              type="text"
              placeholder="タイトルを入力"
              className={titleError ? "invalidTitle" : "validTitle"}
              onChange={(e) => onTitleChange(e)}
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
              onChange={(e) => onDateChange(e)}
            />
            {dateError && <DateErrorMessageContainer dateError={dateError} />}
          </div>
          <div>
            <input
              id="startTime"
              type="time"
              placeholder="--:--"
              className={startTimeError ? "invalidStartTime" : "validStartTime"}
              onChange={(e) => onStartTimeChange(e)}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
              className={endTimeError ? "invalidEndTime" : "validEndTime"}
              onChange={(e) => onEndTimeChange(e)}
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
              onChange={(e) => onMemoChange(e)}
            ></textarea>
            {memoError && <MemoErrorMessageContainer memoError={memoError} />}
          </div>
        </div>
      </div>
    </>
  );
}
