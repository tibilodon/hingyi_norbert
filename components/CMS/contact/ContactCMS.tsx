"use client";
import Loading from "@/app/loading";
import styles from "./contactCMS.module.css";
import Divider from "@/components/divider/Divider";
import InputForm from "@/components/formInput/inputForm/InputForm";

type Props = {
  data:
    | {
        created_at: string;
        description: string | null;
        hero: string | null;
        id: number;
        updated_at: string | null;
        user_id: string | null;
      }[]
    | null;
};

const ContactCMS: React.FunctionComponent<Props> = ({ data }) => {
  if (!data) {
    return <Loading />;
  }

  const { description, hero } = data[0];

  return (
    <>
      <div className={styles.wrap}>
        <h2
          contentEditable
          suppressContentEditableWarning
          // onBlur={onChangeHandler}
          id="hero"
        >
          {hero}
        </h2>
        <Divider />
        <h4
          contentEditable
          suppressContentEditableWarning
          // onBlur={onChangeHandler}
          id="description"
        >
          {description}
        </h4>
        <div className={styles.form}>
          <InputForm />
        </div>
      </div>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          height: "2em",
        }}
      >
        <button>mentés</button>
      </span>
    </>
  );
};

export default ContactCMS;
