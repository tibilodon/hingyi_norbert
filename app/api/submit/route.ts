import { NextResponse } from "next/server";
import sendEmail from "@/utils/sendMail";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { subject, text, html } = data;
    await sendEmail(subject, text, html);
    console.log(data);
  } catch (error) {
    console.log("--ERROR--", error);
  }

  // Return a response
  return NextResponse.json(
    { message: "Message submitted successfully" },
    { status: 200 }
  );
}
