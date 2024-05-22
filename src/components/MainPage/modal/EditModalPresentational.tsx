import { FaCheck } from "react-icons/fa";
import { IoTrash, IoCloseSharp } from "react-icons/io5";
import ErrorMessagePresentational from "./parts/ErrorMessage";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

type Props = {
  today: Dayjs;
  titleErrorMessage: string;
  dateErrorMessage: string;
  startTimeErrorMessage: string;
  endTimeErrorMessage: string;
  memoErrorMessage: string;
  title: string;
  date: Dayjs;
  startTime: string;
  endTime: string;
  memo: string;
  onOutOfModalClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSaveButtonClick: () => void;
  onTrashButtonClick: () => void;
  onCloseButtonClick: () => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function EditModalPresentational({
  today,
  titleErrorMessage,
  dateErrorMessage,
  startTimeErrorMessage,
  endTimeErrorMessage,
  memoErrorMessage,
  title,
  date,
  startTime,
  endTime,
  memo,
  onOutOfModalClick,
  onSaveButtonClick,
  onTrashButtonClick,
  onCloseButtonClick,
  onTitleChange,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onMemoChange,
}: Props) {
  return (
    <>
      <div className="outOfModal" onClick={onOutOfModalClick}>
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
              className={titleErrorMessage ? "invalidTitle" : "validTitle"}
              onChange={onTitleChange}
            ></input>

            <ErrorMessagePresentational errorMessage={titleErrorMessage} />
          </div>
          <div>
            <input
              id="date"
              type="date"
              value={dayjs(date).format("YYYY-MM-DD")}
              min={today.format("YYYY-MM-DD")}
              max={"9999-12-31"}
              className={dateErrorMessage ? "invalidDate" : "validDate"}
              onChange={onDateChange}
            />
            <ErrorMessagePresentational errorMessage={dateErrorMessage} />
          </div>
          <div>
            <input
              id="startTime"
              type="time"
              placeholder="--:--"
              value={startTime}
              className={
                startTimeErrorMessage ? "invalidStartTime" : "validStartTime"
              }
              onChange={onStartTimeChange}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
              value={endTime}
              className={
                endTimeErrorMessage ? "invalidEndTime" : "validEndTime"
              }
              onChange={onEndTimeChange}
            />
            <ErrorMessagePresentational errorMessage={startTimeErrorMessage} />
            <ErrorMessagePresentational errorMessage={endTimeErrorMessage} />
          </div>
          <div>
            <textarea
              id="memo"
              placeholder="memo"
              value={memo}
              className={memoErrorMessage ? "invalidMemo" : "validMemo"}
              onChange={onMemoChange}
            ></textarea>
            <ErrorMessagePresentational errorMessage={memoErrorMessage} />
          </div>
        </div>
      </div>
    </>
  );
}
