"use client";
import styles from "./xTextfield.module.css";
import { useEffect, useRef, useCallback } from "react";

type Props = {
  placeHolder: string;
  onChangeHandler: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  id: string;
  val: string;
};

const XTextfield: React.FunctionComponent<Props> = ({
  placeHolder,
  onChangeHandler,
  id,
  val,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to fit the content
    }
  }, [val]);

  // const valSetter = useCallback(
  //   (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     setVal({ ...val, [formVal]: e.currentTarget.value });
  //   },
  //   [val, setVal, formVal]
  // );

  return (
    <>
      <div className={styles.wrap}>
        <textarea
          id={id}
          required
          ref={textareaRef}
          //   value={val}
          placeholder={placeHolder}
          onChange={onChangeHandler}
          rows={1}
        />
      </div>
    </>
  );
};

export default XTextfield;
