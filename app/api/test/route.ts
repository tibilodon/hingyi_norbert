import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data.image);
    const buffer = Buffer.from(data.image);
    // await prisma.images.create({
    //   data: {
    //     description: data.description,
    //     image: buffer,
    //   },
    // });
  } catch (error) {
    //create error log
    console.log("--ERROR--", error);
  }

  // Return a response
  return NextResponse.json({ message: "whatever added" }, { status: 200 });
}

type fasz = {
  id: number;
  imageUrl: string;
  description: string;
}[];
export async function getData(): Promise<
  fasz | NextResponse<{ error: string }>
> {
  "use server";
  try {
    const img = await prisma.images.findUnique({
      where: {
        id: 1,
      },
    });

    // If 'img' is found, return it as an array
    if (img) {
      return [img];
    } else {
      // Handle case where 'img' is not found
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    // Handle other errors
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export type CMSTest =
  | {
      id: number;
      name: string;
      email: string;
      phone: string;
    }[]
  | NextResponse<{ error: string }>
  | string;
export async function getTest(): Promise<CMSTest> {
  "use server";
  try {
    const resp = await prisma.owner.findUnique({
      where: {
        id: 1,
      },
    });

    // If 'img' is found, return it as an array
    if (resp) {
      return [resp];
    } else {
      // Handle case where 'img' is not found
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    // Handle other errors
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
