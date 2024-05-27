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
  date: Dayjs | null;
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
                isTitleErrorOfCreateNew || isTitleErrorOfEdit || false
                  ? "invalidTitle"
                  : "validTitle"
              }
              onChange={onTitleChange}
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
              onChange={onDateChange}
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
              onChange={onStartTimeChange}
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
              onChange={onEndTimeChange}
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
              onChange={onMemoChange}
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
