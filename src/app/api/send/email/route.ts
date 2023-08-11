import EmailTemplate from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.RESEND_EMAIL_TO as string,
      subject: "Hello World",
      react: EmailTemplate({ firstName: "Railly" }),
      text: "Hello world",
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
