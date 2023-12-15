import styles from "./banner.module.css";
import tape from "@/public/tape.svg";
import tiles from "@/public/tiles.svg";
import van from "@/public/van.svg";
import resto from "@/public/resto.svg";

import BannerBox from "./box/BannerBox";
import { Home } from "@/utils/commonTypes";
import Loading from "@/app/loading";

const Banner: React.FunctionComponent<Home> = ({ data }) => {
  if (!data) {
    return <Loading />;
  }

  const {
    banner_hero,
    bannerBox_1_label,
    bannerBox_1_text,
    bannerBox_2_label,
    bannerBox_2_text,
    bannerBox_3_label,
    bannerBox_3_text,
    bannerBox_4_label,
    bannerBox_4_text,
    color,
  } = data[0];
  return (
    <>
      <div
        className={styles.wrap}
        style={color ? { backgroundColor: color } : {}}
      >
        <h2>{banner_hero}</h2>
        <BannerBox
          img={tiles}
          label={bannerBox_1_label}
          text={bannerBox_1_text}
        />
        <BannerBox
          img={tape}
          label={bannerBox_2_label}
          text={bannerBox_2_text}
        />
        <BannerBox
          img={van}
          label={bannerBox_3_label}
          text={bannerBox_3_text}
        />
        <BannerBox
          img={resto}
          label={bannerBox_4_label}
          text={bannerBox_4_text}
        />
      </div>
    </>
  );
};

export default Banner;
