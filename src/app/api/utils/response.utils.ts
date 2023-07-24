import { NextResponse } from "next/server";

export const CustomResponse = {
  success: (data: any) => NextResponse.json({ data }),
  clientError: (message: string, error: any) =>
    NextResponse.json({ message, error }, { status: 400 }),
  serverError: (message: string, error: any) =>
    NextResponse.json({ message, error }, { status: error?.status || 500 }),
};
