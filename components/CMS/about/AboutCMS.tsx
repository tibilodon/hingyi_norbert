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
  card_1_data: {
    created_at?: string | null;
    id: number;
    table_id: number;
    text: string | null;
    updated_at: string | null;
    user_id: string | null;
  }[];
  card_2_data: {
    created_at: string;
    id: number;
    table_id: number;
    text: string | null;
    updated_at: string | null;
    user_id: string | null;
  }[];
  userId: string;
};

type ImgType = {
  headshot: File | null;
  headshot_title: string;
  upperCard: File | null;
  upperCard_title: string;
  lowerCard: File | null;
  lowerCard_title: string;
};

const AboutCMS: React.FunctionComponent<Props> = ({
  aboutData,
  lowerContent,
  upperContent,
  card_1_data,
  card_2_data,
  userId,
}) => {
  const router = useRouter();
  if (!userId) {
    router.push("/unauthenticated");
  }
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
  // const [imageName, setImageName] = useState<string>("");
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
  // const [img, setImg] = useState<ImgType>({ file: null, title: "" });
  const [img, setImg] = useState<ImgType>({
    headshot: null,
    headshot_title: "",
    upperCard: null,
    upperCard_title: "",
    lowerCard: null,
    lowerCard_title: "",
  });

  const supabase = createClientComponentClient();
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
  const imgUpdateHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: string
  ) => {
    if (e.currentTarget.files) {
      const { id } = e.currentTarget;
      const file = e.currentTarget.files[0];
      setImg((prev: ImgType) => ({
        ...prev,
        [id]: file,
        [title]: String(new Date().getTime()),
      }));
    }
  };

  // const cardImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.currentTarget.files) {
  //     const file = e.currentTarget.files[0];
  //     setImg({ file: file, title: String(new Date().getTime()) });
  //   }
  // };

  //text handler
  const onChangeHandler = (
    e:
      | React.FormEvent<HTMLHeadingElement>
      | React.FormEvent<HTMLLIElement>
      | React.FocusEvent<HTMLSpanElement, Element>,
    setState: React.Dispatch<React.SetStateAction<any>>
  ): void => {
    const { id, textContent } = e.currentTarget;
    setState((prevVals: any) => ({
      ...prevVals,
      [id]: textContent,
    }));
  };

  // cards ought to take in max 5 items
  const sectionOnChangeHandler = (
    e: React.FormEvent<HTMLHeadingElement> | React.FormEvent<HTMLLIElement>,
    setState: React.Dispatch<React.SetStateAction<any>>,
    itemId: number
  ): void => {
    const { id, textContent } = e.currentTarget;
    setState((prevVals: any) => {
      const newArr: any = [...prevVals];
      const indexToUpdate = newArr.findIndex((item: any) => item.id === itemId);

      //if itemId does not exists, no updates will be made
      if (indexToUpdate !== -1) {
        newArr[indexToUpdate] = { ...newArr[indexToUpdate], [id]: textContent };
      }
      return newArr;
    });
  };
  const onDeleteHandler = (
    id: number,
    state: Props[
      | "lowerContent"
      | "upperContent"
      | "card_1_data"
      | "card_2_data"],
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const updatedData = state!!.filter((item) => item.id !== id);
    setState(updatedData);
  };

  const onAddHandler = (
    state: Props[
      | "lowerContent"
      | "upperContent"
      | "card_1_data"
      | "card_2_data"],
    setState: React.Dispatch<React.SetStateAction<any>>,
    section: boolean
  ) => {
    //TODO: upsert might not take in id, in that case add current DateTime
    const id = Number(new Date().getTime());
    //TODO: delete old object, mark it somehow
    const newObj = {
      //upsert is having an issue adding timestamp when @INSERT
      created_at: new Date().toISOString(),
      id: id,
      table_id: 1,
      text: "ADD TEXT",
      // updated_at: "0",
      user_id: userId,
    };
    if (state!!.length <= 4 && !section) {
      setState((prev: any) => [...prev, newObj]);
    }
    if (section) {
      setState((prev: any) => [...prev, newObj]);
    }
  };

  //TODO: DELETE

  const upperCardBgImage: React.CSSProperties = {
    backgroundImage: `url(${
      img.upperCard ? URL.createObjectURL(img.upperCard) : work_card_1_image
    })`,
  };
  const lowerCardBgImage: React.CSSProperties = {
    backgroundImage: `url(${
      img.lowerCard ? URL.createObjectURL(img.lowerCard) : work_card_2_image
    })`,
  };

  // submit handler
  const onSubmitHandler = async () => {
    setIsLoading(true);
    try {
      //headshot image
      let headshotUpdate: boolean = true;
      let upperUpdate: boolean = true;
      let lowerUpdate: boolean = true;
      if (img.headshot) {
        const saveHeadshot = await swapImage(
          "about",
          supabase,
          img.headshot_title,
          img.headshot,
          aboutData.image!!
        );
        if (saveHeadshot!!.ok) {
          headshotUpdate = saveHeadshot!!.ok;
        } else {
          headshotUpdate = false;
        }
      }

      //upper card image
      if (img.upperCard) {
        const saveUpper = await swapImage(
          "about",
          supabase,
          img.upperCard_title,
          img.upperCard,
          aboutData.work_card_1_image!!
        );
        if (saveUpper!!.ok) {
          upperUpdate = saveUpper!!.ok;
        } else {
          upperUpdate = false;
        }
      }

      //lower card image
      if (img.lowerCard) {
        const saveLower = await swapImage(
          "about",
          supabase,
          img.lowerCard_title,
          img.lowerCard,
          aboutData.work_card_2_image!!
        );
        if (saveLower!!.ok) {
          lowerUpdate = saveLower!!.ok;
        } else {
          lowerUpdate = false;
        }
      }

      if (headshotUpdate && upperUpdate && lowerUpdate) {
        const newData = {
          ...form,
          image: img.headshot_title || form.image,
          work_card_1_image: img.upperCard_title || form.work_card_1_image,
          work_card_2_image: img.lowerCard_title || form.work_card_2_image,
        };
        // TODO: upperform, lowerform, cardforms - use upsert
        //submit then
        console.log("NEWDATA", newData);
        const dataResp = await fetch("/api/cms/about", {
          method: "PUT",
          body: JSON.stringify({
            newData,
            upperContent,
            upperForm,
            lowerContent,
            lowerForm,
            card1Form,
            card_1_data,
            card2Form,
            card_2_data,
          }),
        });
        if (dataResp.ok) {
          setIsLoading(false);
          router.refresh();
          //TODO: test if img gets set back to original state
          console.log("img", img);
        }
      }
    } catch (error) {
      console.log(error);
      router.push("/error");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.wrap}>
        <h1
          id="name"
          onBlur={(e) => onChangeHandler(e, setForm)}
          contentEditable
          suppressContentEditableWarning
        >
          {name}
        </h1>
        <span
          id="profession"
          onBlur={(e) => onChangeHandler(e, setForm)}
          contentEditable
          suppressContentEditableWarning
        >
          {profession}
        </span>
        <Divider />

        {image || img.headshot ? (
          <Image
            className={styles.img}
            src={img.headshot ? URL.createObjectURL(img.headshot) : image!!}
            alt="head shot image"
            width={200}
            height={200}
          />
        ) : null}

        <span>
          <input
            id="headshot"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => imgUpdateHandler(e, "headshot_title")}
          />
          <label style={{ backgroundColor: "red" }} htmlFor="headshot">
            Kép csere
          </label>
        </span>
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
            <h2
              id="strong_hero"
              onBlur={(e) => onChangeHandler(e, setForm)}
              contentEditable
              suppressContentEditableWarning
            >
              {strong_hero}
            </h2>

            <h4
              id="strong_text"
              onBlur={(e) => onChangeHandler(e, setForm)}
              contentEditable
              suppressContentEditableWarning
            >
              {strong_text}
            </h4>

            {/*upper_content*/}
            <h2
              id="upper_content_hero"
              onBlur={(e) => onChangeHandler(e, setForm)}
              contentEditable
              suppressContentEditableWarning
            >
              {upper_content_hero}
            </h2>
            <span className={styles.content}>
              {upperForm &&
                upperForm.map((el, i) => {
                  return (
                    <div key={i} style={{ display: "flex", gap: "1em" }}>
                      <p
                        id="text"
                        onBlur={(e) =>
                          sectionOnChangeHandler(e, setUpperForm, el.id)
                        }
                        contentEditable
                        suppressContentEditableWarning
                        key={i}
                      >
                        {el.text}
                      </p>
                      <button
                        onClick={() =>
                          onDeleteHandler(el.id, upperForm, setUpperForm)
                        }
                      >
                        delete
                      </button>
                    </div>
                  );
                })}
            </span>

            <button onClick={() => onAddHandler(upperForm, setUpperForm, true)}>
              add line
            </button>

            {/*lower_content*/}
            <h2
              id="lower_content_hero"
              onBlur={(e) => onChangeHandler(e, setForm)}
              contentEditable
              suppressContentEditableWarning
            >
              {lower_content_hero}
            </h2>
            <span className={styles.contnet}>
              {lowerForm &&
                lowerForm.map((el, i) => {
                  return (
                    <div style={{ display: "flex", gap: "1em" }} key={i}>
                      <p
                        id="text"
                        onBlur={(e) =>
                          sectionOnChangeHandler(e, setLowerForm, el.id)
                        }
                        contentEditable
                        suppressContentEditableWarning
                        key={i}
                      >
                        {el.text}
                      </p>
                      <button
                        onClick={() =>
                          onDeleteHandler(el.id, lowerForm, setLowerForm)
                        }
                      >
                        delete
                      </button>
                    </div>
                  );
                })}
            </span>
            <button onClick={() => onAddHandler(lowerForm, setLowerForm, true)}>
              add line
            </button>
          </span>
        </div>
        {/*TODO: max 5 items other than the header*/}

        {/*workCard1*/}
        <div style={upperCardBgImage} className={styles.cardWrap}>
          <h2
            id="work_card_1"
            onBlur={(e) => onChangeHandler(e, setForm)}
            contentEditable
            suppressContentEditableWarning
          >
            {work_card_1}
          </h2>
          {card1Form.map((el: any, i: number) => {
            return (
              <div style={{ display: "flex", gap: "1em" }} key={el.id}>
                <h3
                  id="text"
                  onBlur={(e) => sectionOnChangeHandler(e, setCard1Form, el.id)}
                  contentEditable
                  suppressContentEditableWarning
                >
                  {el.text}
                </h3>
                <button
                  onClick={() =>
                    onDeleteHandler(el.id, card1Form, setCard1Form)
                  }
                >
                  delete
                </button>
              </div>
            );
          })}
          <button
            disabled={card1Form.length === 5}
            onClick={() => onAddHandler(card1Form, setCard1Form, false)}
          >
            add line
          </button>
        </div>
        <span>
          <input
            id="upperCard"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => imgUpdateHandler(e, "upperCard_title")}
          />
          <label style={{ backgroundColor: "red" }} htmlFor="upperCard">
            Kép csere
          </label>
        </span>

        {/*workCard2*/}
        <div style={lowerCardBgImage} className={styles.cardWrap}>
          <h2
            id="work_card_2"
            onBlur={(e) => onChangeHandler(e, setForm)}
            contentEditable
            suppressContentEditableWarning
          >
            {work_card_2}
          </h2>
          {card2Form.map((el: any, i: number) => {
            return (
              <div style={{ display: "flex", gap: "1em" }} key={el.id}>
                <h3
                  id="text"
                  onBlur={(e) => sectionOnChangeHandler(e, setCard2Form, el.id)}
                  contentEditable
                  suppressContentEditableWarning
                >
                  {el.text}
                </h3>
                <button
                  onClick={() =>
                    onDeleteHandler(el.id, card2Form, setCard2Form)
                  }
                >
                  delete
                </button>
              </div>
            );
          })}
          <button
            disabled={card2Form.length === 5}
            onClick={() => onAddHandler(card2Form, setCard2Form, false)}
          >
            add line
          </button>
        </div>

        <span>
          <input
            id="lowerCard"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => imgUpdateHandler(e, "lowerCard_title")}
          />
          <label style={{ backgroundColor: "red" }} htmlFor="lowerCard">
            Kép csere
          </label>
        </span>

        <button onClick={onSubmitHandler}>save</button>
      </div>
    </>
  );
};

export default AboutCMS;
