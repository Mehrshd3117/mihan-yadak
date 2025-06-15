// lib/contactSchema.js
import { z } from "zod";
export const schema = z.object({
  fullName: z.string().min(3, { message: "حداقل 3 کاراکتر وارد کنید" }),
  email: z.string().email({ message: "ایمیل معتبر وارد کنید" }),
  phone: z.string().regex(/^09\d{9}$/, {
    message: "شماره موبایل معتبر وارد کنید",
  }),
  subject: z.string().min(8, { message: "حداقل 8 کاراکتر وارد کنید" }),
  message: z.string().min(10, { message: "حداقل 10 کاراکتر وارد کنید" }),
  recaptcha: z.string().min(1, { message: "لطفاً تأیید کنید" }),
});
