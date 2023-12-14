import Link from "next/link";
import styles from "./buttonHome.module.css";
import Image from "next/image";

type Props = {
  label: string | null;
  path?: string;
  img: string;
  outline: boolean;
};

const ButtonHome: React.FunctionComponent<Props> = ({
  label,
  path,
  img,
  outline,
}) => {
  return (
    <>
      {path ? (
        <Link href={path}>
          <div
            className={
              outline ? `${styles.wrap} ${styles.outline}` : styles.wrap
            }
          >
            <Image
              className={styles.icon}
              width={20}
              height={20}
              src={img}
              alt={`${label} icon`}
            />
            <h4>{label}</h4>
          </div>
        </Link>
      ) : (
        <div
          className={outline ? `${styles.wrap} ${styles.outline}` : styles.wrap}
        >
          <Image
            className={styles.icon}
            width={20}
            height={20}
            src={img}
            alt={`${label} icon`}
          />
          <h4>{label}</h4>
        </div>
      )}
    </>
  );
};

export default ButtonHome;
