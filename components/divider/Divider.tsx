import styles from "./divider.module.css";

type Props = {};
const Divider: React.FunctionComponent<Props> = () => {
  //TODO: add style from misc -- home should set it
  return (
    <>
      <div className={styles.wrap}></div>
    </>
  );
};

export default Divider;
