import styles from "./footer.module.css";
import RegularButton from "@/components/buttons/regular/RegularButton";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className={styles.wrap}>
        {/* <h2>Ingyenes árajánlatot szeretnék</h2> */}
        <Link href={"/contact"}>
          <RegularButton label="Árajánlatot kérek" color="var(--orange1)" />
        </Link>
      </div>
    </>
  );
};

export default Footer;
