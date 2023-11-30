import styles from "./regularNavbar.module.css";
import Logo from "@/components/logo/Logo";
import Linker from "@/components/linker/Linker";

const RegularNavbar: React.FunctionComponent = () => {
  return (
    <>
      <div className={styles.wrap}>
        <span>
          <Logo />
        </span>
        <div className={styles.menuItem}>
          <Linker label="Főoldal" path="/" />
          <Linker label="Portfólió" path="/portfolio" />
          <Linker label="Rólam" path="/about" />
          <Linker label="Kapcsolat" path="/contact" />
        </div>
      </div>
    </>
  );
};

export default RegularNavbar;
