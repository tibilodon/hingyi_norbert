import { NextPage } from "next";
import styles from "./page.module.css";

type Props = {
  text?: string;
};
const ThankYou: NextPage<Props> = ({ text }) => {
  return (
    <>
      <div className={styles.wrap}>
        <h1>Thank you!</h1>
        {text && <p>{text}</p>}
      </div>
    </>
  );
};
export default ThankYou;
