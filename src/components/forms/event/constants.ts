import { Contact } from "@/types/entities";

export const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const TIME_UNITS = ["Minutes", "Hours", "Days", "Weeks", "Months"];

export const EMPTY_CONTACT: Contact = {
  id: "",
  full_name: "Select a contact",
  email: "",
  phone: "",
  address: "",
  created_at: "",
  image_url: "",
  user_id: "",
};
