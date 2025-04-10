import { z } from "zod";

export const formSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    phoneNo: z
      .string()
      .trim()
      .min(1, "Enter phone number")
      .regex(/^\d+$/, "Phone number must contain only digits")
      .refine((val) => val.length >= 10, {
        message: "Phone number must be at least 10 digits",
      }),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.coerce.number().min(4, "Enter a valid zip code"),
    userName: z.string().min(4, "User name is required"),
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .refine((val) => val.length >= 6, {
        message: "Password must be at least 6 characters",
      }),
    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
