import styles from "./permanentBar.module.css";
import Image from "next/image";
import phone from "@/public/phone.svg";
import white_phone from "@/public/white_phone.svg";
//TODO:add callable func

type Props = {};

const PermanentBar = (props: Props) => {
  return (
    <>
      <div className={styles.wrap}>
        <Image
          src={white_phone}
          width={20}
          height={20}
          alt="phone icon"
          className={styles.icon}
        />
        <h4>06 20 123 4567</h4>
      </div>
    </>
  );
};

export default PermanentBar;
