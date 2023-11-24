import styles from "./banner.module.css";
import tape from "@/public/tape.svg";
import tiles from "@/public/tiles.svg";
import van from "@/public/van.svg";
import resto from "@/public/resto.svg";

import BannerBox from "./box/BannerBox";

const Banner = () => {
  return (
    <>
      <div className={styles.wrap}>
        <h2>Burkolói szolgáltatások</h2>
        <div className={styles.content}>
          <BannerBox
            img={tiles}
            label="Általános burkolás"
            text="Falak, helyiségek és teljes létesítmények"
          />
          <BannerBox
            img={tape}
            label="Nagy és kis munkálatok"
            text="Kérj ingyenes árajánlatot mérettől függetlenül"
          />
          <BannerBox
            img={van}
            label="Szerszám és alapanyag biztosítása"
            text="Minden amire szüksége van, alacsony áron"
          />
          <BannerBox
            img={resto}
            label="Javítás és felújítás"
            text="A régi vagy sértült felület javítható"
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
