import { z } from "zod";

export const formSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email"),
    phoneNo: z.string().min(10, "Enter a valid phone number"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.coerce.number().min(4, "Enter a valid zip code"),
    userName: z.string().min(4, "User name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
