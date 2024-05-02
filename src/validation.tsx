import dayjs from "dayjs";

export type Props = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
};

export default function validate(props: Props) {
  const errorMessage: Props = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    memo: "",
  };
  if (props.title == "") {
    errorMessage.title = "予定は必須項目です";
  } else if (props.title.length > 10) {
    errorMessage.title = "予定は１０文字以下で入力してください";
  }
  if (dayjs(props.date, "YYYY-MM-DD", true).isValid() == false) {
    errorMessage.date = "有効な日付を入力してください";
  }
  if (props.startTime == "") {
    errorMessage.startTime = "開始時刻は必須項目です";
  }
  if (props.endTime == "") {
    errorMessage.endTime = "終了時刻は必須項目です";
  }
  if (props.memo.length > 255) {
    errorMessage.memo = "メモは２５５文字以内で入力してください";
  }

  return errorMessage;
}
