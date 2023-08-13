"use client";
import { type ContactsManager } from "./types";

declare global {
  interface Navigator {
    contacts: ContactsManager;
  }
}
