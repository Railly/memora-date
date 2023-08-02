import * as zod from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const phoneRegex = new RegExp(/^\+\d{1,3}\s*\d{3}\s*[- ]?\d{3}\s*[- ]?\d{3}$/);

export const contactSchema = zod.object({
  selectedContact: zod
    .string()
    .uuid({ message: "Contact selection required." })
    .optional()
    .or(zod.literal("")),
  full_name: zod.string().min(3, { message: "Enter at least 3 chars" }),
  email: zod
    .string()
    .email({
      message: "Enter a valid email",
    })
    .optional()
    .or(zod.literal("")),
  phone: zod
    .string()
    .regex(phoneRegex, "Invalid Number!")
    .optional()
    .or(zod.literal("")),
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
