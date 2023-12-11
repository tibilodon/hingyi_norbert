import styles from "./page.module.css";
import Auther from "@/components/auth/Auther";

export default function Admin() {
  console.log(process.env.APP_KEY_URL);
  return (
    <>
      <div className={styles.wrap}>
        <h1>hello</h1>
        <Auther />
      </div>
    </>
  );
}
