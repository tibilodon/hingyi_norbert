import Link from "next/link";
import styles from "./buttonHome.module.css";
import Image from "next/image";

type Props = {
  label: string | null;
  path?: string;
  img: string;
  outline: boolean;
  color?: string | null;
};

const ButtonHome: React.FunctionComponent<Props> = ({
  label,
  path,
  img,
  outline,
  color,
}) => {
  return (
    <>
      {path ? (
        <Link href={path}>
          <div
            className={
              // outline ? `${styles.wrap} ${styles.outline}` : styles.wrap
              styles.wrap
            }
            style={outline ? { border: `5px solid ${color}` } : {}}
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
