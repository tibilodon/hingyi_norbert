import styles from "./quote.module.css";
import RegularButton from "@/components/buttons/regular/RegularButton";
import Link from "next/link";

const Quote: React.FunctionComponent = () => {
  return (
    <>
      <div className={styles.wrap}>
        <h2>Ingyenes árajánlatot szeretnék</h2>
        <Link className={styles.contact} href={"/contact"}>
          <RegularButton label="Árajánlatot kérek" />
        </Link>
      </div>
    </>
  );
};

export default Quote;
