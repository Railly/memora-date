import * as zod from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const contactSchema = zod.object({
  contact: zod.string().uuid({ message: "Contact selection required." }),
  full_name: zod
    .string()
    .min(3, { message: "Enter at least 3-character name." }),
  phone: zod.string().min(9, { message: "Minimum 9-digit phone number." }),
  email: zod.string().email({ message: "Enter a valid email." }),
  image: zod
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Image max. size: 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp files."
    ),
});
