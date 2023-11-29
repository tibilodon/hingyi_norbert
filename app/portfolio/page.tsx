import styles from "./page.module.css";
import bath_ext from "@/public/bathroom_ext.jpg";
import toilet_new from "@/public/toilet_new.jpg";
import shower_new from "@/public/shower_reno.jpg";

import type { Metadata } from "next";
import ImgModal from "@/components/imgModal/ImgModal";
import Divider from "@/components/divider/Divider";
import RegularButton from "@/components/buttons/regular/RegularButton";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Portfólió - Burkoló | Hingyi Norbert",
  description: "Hingyi Norbert - Burkoló oldala",
};
export default function Portfolio() {
  const imgArr: string[] = [bath_ext.src, toilet_new.src, shower_new.src];
  const descArr: string[] = [
    "Fürdőszoba bővítés",
    "Mellékhelyiség kialakítása",
    "Fürdőszoba felújítás",
  ];
  return (
    <>
      <div className={styles.wrap}>
        <h1>Burkolói munkák</h1>
        <Divider />
        <p>
          A munkám során mindig a minőségre törekszem és arra, hogy az elkészült
          felület tökéletesen nézzen ki és időtálló legyen.
        </p>

        <ImgModal imgArr={imgArr} descArr={descArr} />
      </div>
      <div className={styles.quote}>
        <h1>Ingyenes árajánlat érdekében üzenjen nekem</h1>
        <Link className={styles.contact} href={"/contact"}>
          <RegularButton label="Árajánlatot kérek" />
        </Link>
      </div>
    </>
  );
}
