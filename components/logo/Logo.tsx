import Image from "next/image";
import styles from "./logo.module.css";
import icon from "@/public/trowel.svg";
import Link from "next/link";

type Props = {};

const Logo: React.FunctionComponent<Props> = () => {
  return (
    <>
      <Link href={"/"}>
        <div className={styles.wrap}>
          <h1>H</h1>
          <Image src={icon} alt="icon" priority height={30} width={30} />
          <h1>N</h1>
        </div>
      </Link>
    </>
  );
};

export default Logo;
