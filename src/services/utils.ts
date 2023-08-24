import { CONTACT_ERROR, EVENT_TYPE_ERROR, PROFILE_ERROR } from "./constants";
import { HttpError } from "./errors";

export const clientRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new HttpError(response.status, response.statusText);
    }
    return response.json();
  } catch (error) {
    if (error instanceof HttpError) {
      console.error(`HTTP Error: ${error.status} - ${error.statusText}`);
    } else {
      console.error(error);
    }
    throw error;
  }
};

export const contactServerError = (error: any) => {
  console.error(error);
  return {
    data: null,
    error: {
      name: CONTACT_ERROR,
      message: "Something went wrong, please try again later",
      status: 500,
    },
  };
};

export const eventServiceError = (error: any) => {
  console.error(error);
  return {
    data: null,
    error: {
      name: EVENT_TYPE_ERROR,
      message: "Something went wrong, please try again later",
      status: 500,
    },
  };
};

export const profileServerError = (error: any) => {
  console.error(error);
  return {
    data: null,
    error: {
      name: PROFILE_ERROR,
      message: "Something went wrong, please try again later",
      status: 500,
    },
  };
};
