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
import { NextResponse } from "next/server";

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
  // const [img, setImg] = useState<File[] | null>(null);
  // const [imageName, setImageName] = useState<string[]>([""]);

  useEffect(() => {
    const channel = supabase
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
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);

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
    console.log("itemId,", itemId);

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
          console.log("setting state");
          setNewImages([
            {
              file: file,
              fileName: fileName,
              description: "add desc",
              position: 1,
            },
          ]);
        } else if (Array.isArray(newImages)) {
          const newObj = {
            file: file,
            fileName: fileName,
            description: "add desc",
            position: 1,
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
    console.log("deleteData", deleteData);
    if (updateData?.length) {
      setImagesForm(updateData);
    } else {
      setImagesForm(null);
    }
    if (deleteData?.length) {
      setToBeDeletedImages(deleteData);
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

  //TODO:
  //pagination
  const imgsPerPage = 2;
  const [imgCounter, setImgCounter] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [imgs, setImgs] = useState(imgData?.map(({ image }) => image));

  useEffect(() => {
    const originalImgCount = imagesForm?.length;
    setImgCounter(Number(originalImgCount));

    // if (newImages) {
    //   // setImgs((prevState: any) => ({
    //   //   ...prevState,
    //   //   image: newImages.map(({ file }) => URL.createObjectURL(file!!)),
    //   // }));
    //   setImgs((prevState: any) => {
    //     const updatedImages = newImages.map(({ file, fileName }) => ({
    //       id: fileName,
    //       image: URL.createObjectURL(file!!),
    //     }));

    //     return {
    //       ...prevState,
    //       updatedImages,
    //     };
    //   });
    //   const newImgCount = newImages?.length;
    //   setImgCounter(originalImgCount!! + newImgCount!!);
    // }
  }, [newImages, imagesForm]);

  const indexOfLastItem = currentPage * imgsPerPage;
  const indexOfFirstItem = indexOfLastItem - imgsPerPage;
  const currentItems = imgs?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(imgs!!.length / imgsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  console.log("imgs", imgs);

  const submitHandler = async () => {
    try {
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

      if ((saveResp && deleteResp) || saveResp || deleteResp) {
        console.log("i am just saying either or");
      }
      // await fetch("/api/cms/portfolio", {
      //   method: "PUT",
      //   body: JSON.stringify({ form }),
      // });

      // setImg(null);
      // setImageName([""]);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  //data
  // const imgArrData: string[] = [];
  // const descArrData: string[] = [];
  // const imgId: number[] = [];
  // imgData?.forEach((el) => {
  //   imgArrData.push(el.image!!);
  //   descArrData.push(el.description!!);
  //   imgId.push(el.id!!);
  // });

  const { hero, description } = data[0];

  if (!data || !imgData) {
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
                      <h1
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => onNewImagesChangesHandler(e, fileName)}
                        id="position"
                        style={{ textAlign: "center" }}
                      >
                        {`Position: ${position}`}
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
          {/*-------------------TODO: ADD STYLE FOR PAGINATIONÍ*/}
          {currentItems && (
            <div style={{ display: "flex", border: "3px solid pink" }}>
              {currentItems.map((item, index) => (
                <div key={index}>
                  <Image
                    width={200}
                    height={250}
                    src={item!!}
                    alt={`portfolio image number ${index}`}
                  />
                </div>
              ))}
              <div>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    style={{
                      border: currentPage === i + 1 ? "5px solid green" : "",
                    }}
                    key={i}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {/*TODO: ADD STYLE FOR PAGINATIONÍ-----------------*/}

          <label htmlFor="img">Kép hozzáadása</label>
        </span>

        <button onClick={submitHandler}>mentés</button>
      </div>
    </>
  );
};

export default PortfolioCMS;
