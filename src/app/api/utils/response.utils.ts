import { NextResponse } from "next/server";

export const ApiResponse = {
  success: (data: any, status?: number) =>
    NextResponse.json({ data, ok: true }, { status: status || 200 }),
  clientError: (message: string, error: any) =>
    NextResponse.json({ message, error, ok: false }, { status: 400 }),
  serverError: (message: string, error: any) =>
    NextResponse.json(
      { message, error, ok: false },
      { status: error?.status || 500 }
    ),
};
