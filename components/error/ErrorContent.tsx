import styles from "./errorContent.module.css";
import Link from "next/link";
import RegularButton from "../buttons/regular/RegularButton";

type Props = {};

const ErrorContent = (props: Props) => {
  return (
    <>
      <div className={styles.wrap}>
        <h1>Hiba történt!</h1>
        <Link href={"/"}>
          <RegularButton label="Vissza a főoldalra" />
        </Link>
      </div>
    </>
  );
};

export default ErrorContent;
