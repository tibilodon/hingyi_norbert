import styles from "./permanentBar.module.css";
import Image from "next/image";
import phone from "@/public/phone.svg";
import white_phone from "@/public/white_phone.svg";
//TODO:add callable func

type Props = {};

const PermanentBar = (props: Props) => {
  const phoneNum = "06 12 123 456";
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
        <a href={`tel:${phoneNum}`}>
          <h4>06 12 123 456</h4>
        </a>
      </div>
    </>
  );
};

export default PermanentBar;
