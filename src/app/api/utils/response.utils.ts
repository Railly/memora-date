import { NextResponse } from "next/server";

export const ApiResponse = {
  success: (data: any) => NextResponse.json({ data, ok: true }),
  clientError: (message: string, error: any) =>
    NextResponse.json({ message, error }, { status: 400 }),
  serverError: (message: string, error: any) =>
    NextResponse.json({ message, error }, { status: error?.status || 500 }),
};
