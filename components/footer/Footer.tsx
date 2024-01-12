"use client";
import styles from "./footer.module.css";
import RegularButton from "@/components/buttons/regular/RegularButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Miscellaneous } from "@/utils/commonTypes";
import Loading from "@/app/loading";

const Footer: React.FunctionComponent<Miscellaneous> = ({ data }) => {
  const pathname = usePathname();
  const styler = (): string => {
    if (
      pathname === "/contact" ||
      pathname.includes("cms") ||
      pathname.includes("unauthenticated")
    ) {
      return `${styles.hide}`;
    } else {
      return `${styles.wrap}`;
    }
  };

  return (
    <>
      {data && (
        <div className={styler()}>
          {/* <h2>Ingyenes árajánlatot szeretnék</h2> */}
          <Link href={"/contact"}>
            <RegularButton label={data[0].footerText} color={data[0].color} />
          </Link>
        </div>
      )}
    </>
  );
};

export default Footer;
