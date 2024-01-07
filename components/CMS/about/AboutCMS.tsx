"use client";
import styles from "./aboutCMS.module.css";
import Loading from "@/app/loading";
import { useState, useEffect, FormEvent } from "react";
import Divider from "@/components/divider/Divider";
import Image from "next/image";
import WorkCard from "@/components/workCard/WorkCard";
import { useFormState } from "react-dom";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { swapImage } from "@/utils/CMSHelpers";

type Props = {
  aboutData: {
    id: number;
    name: string | null;
    profession: string | null;
    image: string | null;
    hero: string | null;
    work_card_1: string | null;
    work_card_2: string | null;
    strong_hero: string | null;
    strong_text: string | null;
    upper_content_hero: string | null;
    lower_content_hero: string | null;
    work_card_1_image: string | null;
    work_card_2_image: string | null;
  };
  lowerContent:
    | {
        created_at: string;
        id: number;
        table_id: number;
        text: string | null;
        updated_at: string | null;
        user_id: string | null;
      }[]
    | null;
  upperContent:
    | {
        created_at: string;
        id: number;
        table_id: number;
        text: string | null;
        updated_at: string | null;
        user_id: string | null;
      }[]
    | null;
  card_1_data: (string | null)[];
  card_2_data: (string | null)[];
};

type ImgType = {
  file: File | null;
  title: string;
};

const AboutCMS: React.FunctionComponent<Props> = ({
  aboutData,
  lowerContent,
  upperContent,
  card_1_data,
  card_2_data,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //main data
  const [form, setForm] = useState(aboutData);
  //lower content
  const [lowerForm, setLowerForm] = useState(lowerContent);
  //upper content
  const [upperForm, setUpperForm] = useState(upperContent);
  //card_1_data

  //find the exact place in the array and replace that element
  //  max 5 items
  const [card1Form, setCard1Form] = useState(card_1_data);
  const [card2Form, setCard2Form] = useState(card_2_data);

  //will serve as preview as well
  const [img, setImg] = useState<ImgType>({ file: null, title: "" });
  const [imageName, setImageName] = useState<string>("");
  const {
    id,
    name,
    profession,
    image,
    hero,
    work_card_1,
    work_card_2,
    strong_hero,
    strong_text,
    upper_content_hero,
    lower_content_hero,
    work_card_1_image,
    work_card_2_image,
  } = form;

  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel("realtime home")
      .on(
        "postgres_changes",
        {
          event: "*", //insert,update,delete
          schema: "public",
          table: "Home",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  //  img update handler
  const imgUpdateHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];

      setImg({ file: file, title: String(new Date().getTime()) });
    }
  };

  //  onchange, takes in (set)state as well
  const onChangeHandler = (
    e: React.FormEvent<HTMLHeadingElement> | React.FormEvent<HTMLLIElement>,
    setState: React.Dispatch<React.SetStateAction<any>>
  ): void => {
    const { id, textContent } = e.currentTarget;
    setState((prevVals: any) => ({
      ...prevVals,
      [id]: textContent,
    }));
  };

  const cardHandler = () => {};

  // submit handler
  const onSubmitHandler = async () => {
    console.log("hero", hero);
  };
  return (
    <>
      <div className={styles.wrap}>
        <h1 contentEditable suppressContentEditableWarning>
          {name}
        </h1>
        <span contentEditable suppressContentEditableWarning>
          {profession}
        </span>
        <Divider />
        <Image
          className={styles.img}
          src={image!!}
          alt="head shot image"
          width={200}
          height={200}
        />
        <div className={styles.content}>
          <span className={styles.newContent}>
            <h1
              id="hero"
              onBlur={(e) => onChangeHandler(e, setForm)}
              contentEditable
              suppressContentEditableWarning
            >
              {hero}
            </h1>
            <h2 contentEditable suppressContentEditableWarning>
              {strong_hero}
            </h2>
            <h4 contentEditable suppressContentEditableWarning>
              {strong_text}
            </h4>
            <h2 contentEditable suppressContentEditableWarning>
              {upper_content_hero}
            </h2>
            <span className={styles.content}>
              {/*TODO: MAP OUT CONTENT, INTRODUCE CLIENT COMPONENT, ADD "INSERT NEW LINE" FUNCTIONALITY*/}
              {upperForm &&
                upperForm.map(({ text }, i) => {
                  return (
                    <p contentEditable suppressContentEditableWarning key={i}>
                      {text}
                    </p>
                  );
                })}
            </span>
            <h2 contentEditable suppressContentEditableWarning>
              {lower_content_hero}
            </h2>
            <span className={styles.contnet}>
              {/*TODO: MAP OUT CONTENT*/}
              {lowerForm &&
                lowerForm.map(({ text }, i) => {
                  return (
                    <p contentEditable suppressContentEditableWarning key={i}>
                      {text}
                    </p>
                  );
                })}
            </span>
          </span>
        </div>
        {/*TODO: max 5 items other than the header*/}

        <WorkCard
          header={work_card_1!!}
          img={work_card_1_image!!}
          list={card1Form}
        />

        <WorkCard
          header={work_card_2!!}
          img={work_card_2_image!!}
          list={card2Form}
        />
        <button onClick={onSubmitHandler}>save</button>
      </div>
    </>
  );
};

export default AboutCMS;
