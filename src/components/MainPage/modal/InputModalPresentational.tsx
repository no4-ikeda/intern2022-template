import { ErrorMessage } from "./parts/ErrorMessage";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa";
import { IoTrash, IoCloseSharp } from "react-icons/io5";
import type { Dayjs } from "dayjs";
import type { Schedule } from "~/types/types";
import { useCallback } from "react";

type Props = {
  today: Dayjs;
  titleErrorMessage: string;
  dateErrorMessage: string;
  startTimeErrorMessage: string;
  endTimeErrorMessage: string;
  memoErrorMessage: string;
  title: string;
  date: Dayjs | null;
  startTime: string;
  endTime: string;
  memo: string;
  isSaveButtonClicked: boolean;
  selectedSchedule: Schedule | null;
  onOutOfModalClick: () => void;
  onSaveButtonClick: () => void;
  onTrashButtonClick: () => void;
  onCloseButtonClick: () => void;
  onTitleChange: (title: string) => void;
  onDateChange: (date: string) => void;
  onStartTimeChange: (startTime: string) => void;
  onEndTimeChange: (endTime: string) => void;
  onMemoChange: (memo: string) => void;
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
  // 新規作成のエラーであるか、編集のエラーであるか
  const isTitleErrorOfCreateNew = selectedSchedule && titleErrorMessage;
  const isTitleErrorOfEdit = isSaveButtonClicked && titleErrorMessage;
  const isDateErrorOfCreateNew = selectedSchedule && dateErrorMessage;
  const isDateErrorOfEdit = isSaveButtonClicked && dateErrorMessage;
  const isStartTimeErrorOfCreateNew = selectedSchedule && startTimeErrorMessage;
  const isStartTimeErrorOfEdit = isSaveButtonClicked && startTimeErrorMessage;
  const isEndTimeErrorOfCreateNew = selectedSchedule && endTimeErrorMessage;
  const isEndTimeErrorOfEdit = isSaveButtonClicked && endTimeErrorMessage;
  const isMemoErrorOfCreateNew = selectedSchedule && memoErrorMessage;
  const isMemoErrorOfEdit = isSaveButtonClicked && memoErrorMessage;
  const handleClickOutOfModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onOutOfModalClick();
    }
  };

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onTitleChange(e.target.value);
    },
    [onTitleChange]
  );
  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onDateChange(e.target.value);
    },
    [onDateChange]
  );
  const handleStartTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onStartTimeChange(e.target.value);
    },
    [onStartTimeChange]
  );
  const handleEndTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onEndTimeChange(e.target.value);
    },
    [onEndTimeChange]
  );
  const handleMemoChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onMemoChange(e.target.value);
    },
    [onMemoChange]
  );

  // selectedScheduleの有無で新規作成モーダルか編集モーダルか判断
  return (
    <>
      <div className="outOfModal" onClick={handleClickOutOfModal}>
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
                isTitleErrorOfCreateNew || isTitleErrorOfEdit || false
                  ? "invalidTitle"
                  : "validTitle"
              }
              onChange={handleTitleChange}
            ></input>

            {isTitleErrorOfCreateNew ? (
              <ErrorMessage errorMessage={titleErrorMessage} />
            ) : (
              isTitleErrorOfEdit && (
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
                isDateErrorOfCreateNew || isDateErrorOfEdit || false
                  ? "invalidDate"
                  : "validDate"
              }
              onChange={handleDateChange}
            />
            {isDateErrorOfCreateNew ? (
              <ErrorMessage errorMessage={dateErrorMessage} />
            ) : (
              isDateErrorOfEdit && (
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
                isStartTimeErrorOfCreateNew || isStartTimeErrorOfEdit || false
                  ? "invalidStartTime"
                  : "validStartTime"
              }
              onChange={handleStartTimeChange}
            />
            ~
            <input
              id="endTime"
              type="time"
              placeholder="--:--"
              value={endTime}
              className={
                isEndTimeErrorOfCreateNew || isEndTimeErrorOfEdit || false
                  ? "invalidEndTime"
                  : "validEndTime"
              }
              onChange={handleEndTimeChange}
            />
            {isStartTimeErrorOfCreateNew ? (
              <ErrorMessage errorMessage={startTimeErrorMessage} />
            ) : (
              isStartTimeErrorOfEdit && (
                <ErrorMessage errorMessage={startTimeErrorMessage} />
              )
            )}
            {isEndTimeErrorOfCreateNew ? (
              <ErrorMessage errorMessage={endTimeErrorMessage} />
            ) : (
              isEndTimeErrorOfEdit && (
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
                isMemoErrorOfCreateNew || isMemoErrorOfEdit || false
                  ? "invalidMemo"
                  : "validMemo"
              }
              onChange={handleMemoChange}
            ></textarea>
            {isMemoErrorOfCreateNew ? (
              <ErrorMessage errorMessage={memoErrorMessage} />
            ) : (
              isMemoErrorOfEdit && (
                <ErrorMessage errorMessage={memoErrorMessage} />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
