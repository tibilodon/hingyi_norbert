import styles from "./bannerBox.module.css";
import Image from "next/image";

type Props = { img: string; label: string; text: string };

const BannerBox: React.FunctionComponent<Props> = ({ img, label, text }) => {
  return (
    <>
      <div className={styles.wrap}>
        <Image width={80} src={img} alt={`${label} icon`} />
        <div className={styles.texts}>
          <h3>{label}</h3>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default BannerBox;
