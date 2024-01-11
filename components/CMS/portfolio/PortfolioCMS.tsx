"use client";
import styles from "./portfolioCMS.module.css";
import Divider from "@/components/divider/Divider";

import { saveImageToBucket, deleteImagesFromBucket } from "@/utils/CMSHelpers";
import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import RegularButton from "@/components/buttons/regular/RegularButton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

type Props = {
  data: {
    created_at: string;
    description: string | null;
    hero: string | null;
    id: number;
    updated_at: string | null;
    user_id: string | null;
  }[];
  imgData:
    | {
        created_at: string;
        description: string | null;
        id: number;
        image: string | null;
        position: number | null;
        table_id: number;
        updated_at: string | null;
        user_id: string | null;
      }[]
    | null;
};

type NewImages =
  | {
      file: File | null;
      fileName: string;
      description: string;
      position: number;
    }[]
  | null;
const PortfolioCMS: React.FunctionComponent<Props> = ({ data, imgData }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  //portfolio table
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState(data[0]);
  //portfolio_images
  const [imagesForm, setImagesForm] = useState(imgData);
  const [toBeDeletedImages, setToBeDeletedImages] =
    useState<Props["imgData"]>(null);
  //newly selected images+desc+title
  const [newImages, setNewImages] = useState<NewImages>(null);

  useEffect(() => {
    const textChannel = supabase
      .channel("realtime portfolio")
      .on(
        "postgres_changes",
        {
          event: "*", //insert,update,delete
          schema: "public",
          table: "Portfolio",
        },
        () => {
          router.refresh();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "*", //insert,update,delete
          schema: "public",
          table: "Portfolio_Images",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    setImagesForm(imgData);
    return () => {
      supabase.removeChannel(textChannel);
    };
  }, [router, supabase, imgData]);

  const onChangeHandler = (
    e: React.FormEvent<HTMLHeadingElement> | FormEvent<HTMLLIElement>
  ): void => {
    const { id, textContent } = e.currentTarget;
    setForm((prevVals: any) => ({
      ...prevVals,
      [id]: textContent,
    }));
  };

  //img updates
  const onImageChangeHandler = (
    e: React.FormEvent<HTMLHeadingElement> | FormEvent<HTMLLIElement>,
    itemId: number
  ): void => {
    const { id, textContent } = e.currentTarget;
    const updatedItem = imagesForm?.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          [id]: textContent,
        };
      }
      return item;
    });

    setImagesForm(updatedItem ?? null);
  };

  //upload new img
  //  <TODO:>new Image will be the fist one, others shift one forward</TODO:>
  const imgUpdateHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];

      if (file) {
        const fileName = String(new Date().getTime());
        if (newImages === null) {
          setNewImages([
            {
              file: file,
              fileName: fileName,
              description: "add desc",
              position: 0,
            },
          ]);
        } else if (Array.isArray(newImages)) {
          const newObj = {
            file: file,
            fileName: fileName,
            description: "add desc",
            position: 0,
          };
          setNewImages((prev: any) => [...prev, newObj]);
        }
      }
    }
  };

  const onNewImagesChangesHandler = (
    e: React.FormEvent<HTMLHeadingElement> | FormEvent<HTMLLIElement>,
    fileName: string
  ): void => {
    const { id, textContent } = e.currentTarget;
    const updatedItem = newImages?.map((item) => {
      if (item.fileName === fileName) {
        return {
          ...item,
          [id]: textContent,
        };
      }
      return item;
    });

    setNewImages(updatedItem ?? null);
  };

  //delete img
  const deleteImg = (id: number) => {
    const updateData = imagesForm?.filter((item) => item.id !== id);
    const deleteData = imagesForm?.filter((item) => item.id === id);

    if (updateData?.length) {
      setImagesForm(updateData);
    } else {
      setImagesForm(null);
    }
    if (deleteData?.length && toBeDeletedImages === null) {
      setToBeDeletedImages(deleteData);
    }
    if (deleteData?.length && toBeDeletedImages !== null) {
      setToBeDeletedImages((prevState) => [
        ...prevState!!,
        ...deleteData, // Spread the elements of deleteData array
      ]);
    }
  };
  //  delete new Image
  const deleteNewImg = (fileName: string) => {
    // const updateItem = newImages?.map((item) => {
    //   if (item.fileName === fileName) {
    //   }
    // });
    const updateData = newImages?.filter((item) => item.fileName !== fileName);
    if (updateData?.length) {
      setNewImages(updateData);
    } else {
      setNewImages(null);
    }
  };

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      //TODO:add error handling
      let saveResp;
      let deleteResp;
      //save images
      if (newImages) {
        const saveImg = await saveImageToBucket(
          "portfolio",
          supabase,
          newImages!!
        );
        saveResp = saveImg?.ok;
        console.log("saveImg", saveImg);
      }
      //delete images
      if (toBeDeletedImages) {
        const delResp = await deleteImagesFromBucket(
          "portfolio",
          supabase,
          toBeDeletedImages
        );
        deleteResp = delResp.ok;
      }

      const resp = await fetch("/api/cms/portfolio", {
        method: "PUT",
        body: JSON.stringify({
          form,
          imagesForm,
          newImages,
          toBeDeletedImages,
        }),
      });

      if (resp.ok) {
        router.refresh();
        setNewImages(null);
        setToBeDeletedImages(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { hero, description } = data[0];

  if (!data || !imgData || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.wrap}>
        <span>
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={onChangeHandler}
            id="hero"
          >
            {hero}
          </h1>
          <Divider />
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={onChangeHandler}
            id="description"
          >
            {description}
          </p>
        </span>
        <div className={styles.imgWrap}>
          {imagesForm !== null
            ? imagesForm.map(({ id, image, description }, index: number) => {
                return (
                  <div key={id} className={styles.imgContent}>
                    <Image
                      width={200}
                      height={250}
                      src={image!!}
                      alt={`portfolio image number ${index}`}
                    />
                    <h1
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onImageChangeHandler(e, id)}
                      id="description"
                      style={{ textAlign: "center" }}
                    >
                      {description}
                    </h1>
                    <div className={styles.edit}>
                      <span onClick={() => deleteImg(id)}>
                        {/*TODO:add storage handler*/}
                        <RegularButton label={"Törlés"} />
                      </span>
                    </div>
                  </div>
                );
              })
            : null}

          {newImages !== null
            ? newImages.map(
                ({ fileName, file, position, description }, index: number) => {
                  return (
                    <div key={index} className={styles.imgContent}>
                      <Image
                        width={200}
                        height={250}
                        src={URL.createObjectURL(file!!)}
                        alt={`portfolio image number ${index}`}
                      />
                      <h1
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onNewImagesChangesHandler(e, fileName)}
                        id="description"
                        style={{ textAlign: "center" }}
                      >
                        {description}
                      </h1>
                      <h1>Position: </h1>
                      <h1
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onNewImagesChangesHandler(e, fileName)}
                        id="position"
                        style={{ textAlign: "center" }}
                      >
                        {position}
                      </h1>
                      <div className={styles.edit}>
                        <span onClick={() => deleteNewImg(fileName)}>
                          {/*TODO:add storage handler*/}
                          <RegularButton label={"Törlés"} />
                        </span>
                      </div>
                    </div>
                  );
                }
              )
            : null}
        </div>

        <span>
          <input
            id="img"
            style={{ display: "none" }}
            type="file"
            onChange={imgUpdateHandler}
          />

          <label htmlFor="img">Kép hozzáadása</label>
        </span>

        <button onClick={submitHandler}>mentés</button>
      </div>
    </>
  );
};

export default PortfolioCMS;
