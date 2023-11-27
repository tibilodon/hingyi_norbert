import Image from "next/image";
import styles from "./logo.module.css";
import trowel from "@/public/trowel_2.svg";
import Link from "next/link";

type Props = {};

const Logo: React.FunctionComponent<Props> = () => {
  return (
    <>
      <Link href={"/"}>
        <div className={styles.wrap}>
          <h1>H</h1>
          <Image src={trowel} alt="icon" priority height={30} width={30} />
          <h1>N</h1>
        </div>
      </Link>
    </>
  );
};

export default Logo;
