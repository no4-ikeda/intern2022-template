import { FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import ErrorMessage from "./parts/ErrorMessage";
import type { Dayjs } from "dayjs";

type Props = {
  today: Dayjs;
  date: Dayjs;
  titleErrorMessage: string;
  dateErrorMessage: string;
  startTimeErrorMessage: string;
  endTimeErrorMessage: string;
  memoErrorMessage: string;
  onOutOfModalClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSaveButtonClick: () => void;
  onCloseButtonClick: () => void;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function CreateNewModalPresentational({
  date,
  today,
  titleErrorMessage,
  dateErrorMessage,
  startTimeErrorMessage,
  endTimeErrorMessage,
  memoErrorMessage,
  onOutOfModalClick,
  onSaveButtonClick,
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
        {/**モーダル内容 */}
        <div className="createNewModal">
          <header>
            <span className="createNewHeader">予定の作成</span>
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
              className={titleErrorMessage ? "invalidTitle" : "validTitle"}
              onChange={onTitleChange}
            ></input>

            <ErrorMessage errorMessage={titleErrorMessage} />
          </div>
          <div>
            <input
              id="date"
              type="date"
              value={date.format("YYYY-MM-DD")}
              min={today.format("YYYY-MM-DD")}
              max={"9999-12-31"}
              className={dateErrorMessage ? "invalidDate" : "validDate"}
              onChange={onDateChange}
            />
            <ErrorMessage errorMessage={dateErrorMessage} />
          </div>
          <div>
            <input
              id="startTime"
              type="time"
              placeholder="--:--"
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
              className={
                endTimeErrorMessage ? "invalidEndTime" : "validEndTime"
              }
              onChange={onEndTimeChange}
            />
            <ErrorMessage errorMessage={startTimeErrorMessage} />
            <ErrorMessage errorMessage={endTimeErrorMessage} />
          </div>
          <div>
            <textarea
              id="memo"
              placeholder="memo"
              className={memoErrorMessage ? "invalidMemo" : "validMemo"}
              onChange={onMemoChange}
            ></textarea>

            <ErrorMessage errorMessage={memoErrorMessage} />
          </div>
        </div>
      </div>
    </>
  );
}
