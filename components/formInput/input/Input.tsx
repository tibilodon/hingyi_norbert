"use client";
import styles from "./Input.module.css";

type Props = {
  type: string;
  placeholder: string;
  onChangeHandler: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  id: string;
};
const Input: React.FunctionComponent<Props> = ({
  type,
  placeholder,
  onChangeHandler,
  id,
}) => {
  return (
    <div className={styles.wrap}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Input;
