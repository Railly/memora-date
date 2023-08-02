import * as zod from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const contactSchema = zod.object({
  contact: zod
    .string()
    .uuid({ message: "Contact selection required." })
    .optional(),
  full_name: zod
    .string()
    .min(3, { message: "Enter at least 3-character name." }),
  phone: zod
    .string()
    .nullable()
    .refine((val) => val === "" || String(val).length >= 9, {
      message: "Minimum 9-digit phone number.",
    }),
  email: zod
    .string()
    .nullable()
    .refine((val) => val === "" || String(val).includes("@"), {
      message: "Enter a valid email.",
    }),
  image: zod
    .any()
    .refine((files) => {
      if (!files?.[0]?.size) return true;
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Image max. size: 2MB.`)
    .refine((files) => {
      if (!files?.[0]?.type) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type);
    }, "Only .jpg, .jpeg, .png and .webp files.")
    .optional(),
});
