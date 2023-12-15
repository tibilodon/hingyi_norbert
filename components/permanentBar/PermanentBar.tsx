import styles from "./permanentBar.module.css";
import Image from "next/image";
import white_phone from "@/public/white_phone.svg";
import { Miscellaneous } from "@/utils/commonTypes";
import Loading from "@/app/loading";
//TODO:add callable func

const PermanentBar: React.FunctionComponent<Miscellaneous> = ({ data }) => {
  // const phoneNum = "06 30 716 9769";

  if (!data) {
    return <Loading />;
  }

  const { phoneNumber, email, color } = data[0];
  return (
    <>
      <div
        style={color ? { backgroundColor: color } : {}}
        className={styles.wrap}
      >
        <span>
          <Image
            src={white_phone}
            width={20}
            height={20}
            alt="phone icon"
            className={styles.icon}
          />
          <a href={`tel:${phoneNumber}`}>
            <h4>{phoneNumber}</h4>
          </a>
        </span>
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </>
  );
};

export default PermanentBar;
