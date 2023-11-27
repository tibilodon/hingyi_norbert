import styles from "./page.module.css";

type Props = {
  text?: string;
};
export default function ThankYou({ text }: Props) {
  return (
    <>
      <div className={styles.wrap}>
        <h1>Thank you!</h1>
        {text && <p>{text}</p>}
      </div>
    </>
  );
}
