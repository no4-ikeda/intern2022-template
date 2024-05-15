import { FaCheck } from "react-icons/fa";
import { IoTrash, IoCloseSharp } from "react-icons/io5";
import type { EditModalPresenterProps } from "./types/types";
import {
  TitleErrorMessageContainer,
  DateErrorMessageContainer,
  StartTimeErrorMessageContainer,
  EndTimeErrorMessageContainer,
  MemoErrorMessageContainer,
} from "./ErrorMessageContainer";

export default function EditModalPresenter({
  onOutOfModalClick,
  onSaveButtonClick,
  onTrashButtonClick,
  onCloseButtonClick,
  onTitleChange,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onMemoChange,
  today,
  titleError,
  dateError,
  startTimeError,
  endTimeError,
  memoError,
  title,
  date,
  startTime,
  endTime,
  memo,
}: EditModalPresenterProps) {
  return (
    <>
      <div className="outOfModal" onClick={(e) => onOutOfModalClick(e)}>
        <div className="editModal">
          <header>
            <span className="editHeader">予定の編集</span>
            <button
              className="headerIcons"
              type="submit"
              onClick={onSaveButtonClick}
            >
              <FaCheck />
            </button>
            <button
              className="headerIcons"
              type="submit"
              onClick={onTrashButtonClick}
            >
              <IoTrash />
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
              value={title}
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
              value={startTime}
              className={startTimeError ? "invalidStartTime" : "validStartTime"}
              onChange={(e) => onStartTimeChange(e)}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
              value={endTime}
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
              value={memo}
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
