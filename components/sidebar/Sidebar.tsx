import styles from "./sidebar.module.css";
import Linker from "../linker/Linker";

const Sidebar = () => {
  return (
    <>
      <div className={styles.wrap}>
        <Linker label="Főoldal" path="/" />
        <Linker label="Portfólió" path="/portfolio" />
        <Linker label="Rólam" path="/about" />
        <Linker label="Kapcsolat" path="/contact" />
      </div>
    </>
  );
};

export default Sidebar;
