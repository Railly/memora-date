import EmailTemplate from "@/components/email-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { Receiver } from "@upstash/qstash";
import { headers } from "next/headers";

if (
  !process.env.QSTASH_CURRENT_SIGNING_KEY ||
  !process.env.QSTASH_NEXT_SIGNING_KEY
) {
  throw new Error(
    "Missing QSTASH_CURRENT_SIGNING_KEY or QSTASH_NEXT_SIGNING_KEY environment variable"
  );
}

const qstashReceiver = new Receiver({
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const nextHeaders = headers();
    const isValid = await qstashReceiver.verify({
      signature: nextHeaders.get("x-qstash-signature") as string,
      body: await req.text(),
    });

    if (isValid) {
      const body = await req.json();
      const { event, reminder } = body;
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.RESEND_EMAIL_TO as string,
        subject: `${event.name} - ${event.date}`,
        react: EmailTemplate({ event, reminder }),
        text: "Hello world",
      });
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
