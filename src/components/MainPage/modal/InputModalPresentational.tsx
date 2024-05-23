import { ErrorMessage } from "./parts/ErrorMessage";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa";
import { IoTrash, IoCloseSharp } from "react-icons/io5";
import type { Dayjs } from "dayjs";
import type { Schedule } from "~/types/types";

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
  isSaveButtonClicked: boolean;
  selectedSchedule: Schedule | null;
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

export const InputModalPresentational = ({
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
  selectedSchedule,
  isSaveButtonClicked,
  onOutOfModalClick,
  onSaveButtonClick,
  onTrashButtonClick,
  onCloseButtonClick,
  onTitleChange,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  onMemoChange,
}: Props) => {
  // selectedCheduleの有無で新規作成モーダルか編集モーダルか判断
  return (
    <>
      <div className="outOfModal" onClick={onOutOfModalClick}>
        <div className={selectedSchedule ? "editModal" : "createNewModal"}>
          <header>
            <span
              className={selectedSchedule ? "editHeader" : "createNewHeader"}
            >
              {selectedSchedule ? "予定の編集" : "予定の作成"}
            </span>
            <button
              className="headerIcons"
              type="submit"
              onClick={onSaveButtonClick}
            >
              <FaCheck />
            </button>
            {selectedSchedule && (
              <button
                className="headerIcons"
                type="submit"
                onClick={onTrashButtonClick}
              >
                <IoTrash />
              </button>
            )}

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
              className={
                selectedSchedule && titleErrorMessage
                  ? "invalidTitle"
                  : isSaveButtonClicked && titleErrorMessage
                  ? "invalidTitle"
                  : "validTitle"
              }
              onChange={onTitleChange}
            ></input>

            {selectedSchedule && titleErrorMessage ? (
              <ErrorMessage errorMessage={titleErrorMessage} />
            ) : (
              isSaveButtonClicked &&
              titleErrorMessage && (
                <ErrorMessage errorMessage={titleErrorMessage} />
              )
            )}
          </div>
          <div>
            <input
              id="date"
              type="date"
              value={dayjs(date).format("YYYY-MM-DD")}
              min={today.format("YYYY-MM-DD")}
              max={"9999-12-31"}
              className={
                selectedSchedule && dateErrorMessage
                  ? "invalidDate"
                  : isSaveButtonClicked && dateErrorMessage
                  ? "invalidDate"
                  : "validDate"
              }
              onChange={onDateChange}
            />
            {selectedSchedule && dateErrorMessage ? (
              <ErrorMessage errorMessage={dateErrorMessage} />
            ) : (
              isSaveButtonClicked &&
              dateErrorMessage && (
                <ErrorMessage errorMessage={dateErrorMessage} />
              )
            )}
          </div>
          <div>
            <input
              id="startTime"
              type="time"
              placeholder="--:--"
              value={startTime}
              className={
                selectedSchedule && startTimeErrorMessage
                  ? "invalidStartTime"
                  : isSaveButtonClicked && startTimeErrorMessage
                  ? "invalidStartTime"
                  : "validStartTime"
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
                selectedSchedule && endTimeErrorMessage
                  ? "invalidEndTime"
                  : isSaveButtonClicked && endTimeErrorMessage
                  ? "invalidEndTime"
                  : "validEndTime"
              }
              onChange={onEndTimeChange}
            />
            {selectedSchedule && startTimeErrorMessage ? (
              <ErrorMessage errorMessage={startTimeErrorMessage} />
            ) : (
              isSaveButtonClicked &&
              startTimeErrorMessage && (
                <ErrorMessage errorMessage={startTimeErrorMessage} />
              )
            )}
            {selectedSchedule && endTimeErrorMessage ? (
              <ErrorMessage errorMessage={endTimeErrorMessage} />
            ) : (
              isSaveButtonClicked &&
              endTimeErrorMessage && (
                <ErrorMessage errorMessage={endTimeErrorMessage} />
              )
            )}
          </div>
          <div>
            <textarea
              id="memo"
              placeholder="memo"
              value={memo}
              className={
                selectedSchedule && memoErrorMessage
                  ? "invalidMemo"
                  : isSaveButtonClicked && memoErrorMessage
                  ? "invalidMemo"
                  : "validMemo"
              }
              onChange={onMemoChange}
            ></textarea>
            {selectedSchedule && memoErrorMessage ? (
              <ErrorMessage errorMessage={memoErrorMessage} />
            ) : (
              isSaveButtonClicked &&
              memoErrorMessage && (
                <ErrorMessage errorMessage={memoErrorMessage} />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
