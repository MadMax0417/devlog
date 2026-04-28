import z, { minLength, xid } from "zod";

export const registerUserZodSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username should be at least 2 character")
    .max(100, "Username should not exceed 100 character"),
  fullName: z
    .string()
    .trim()
    .min(5, "Username should be at least 2 character")
    .max(500, "Username should not exceed 100 character"),
  email: z.email().trim().max(500, "Username should not exceed 100 character"),
  password: z
    .string()
    .trim()
    .min(6, "Password should be at least 6 characters")
    .max(100, "Password should be at most 100 characters"),
});

export const loginUserZodSchema = z.object({
  usernameOrEmail: z.union([
    z
      .email("Invalid email format")
      .trim()
      .max(500, "Username should not exceed 100 character"),
    z
      .string()
      .trim()
      .min(2, "Username should be at least 2 character")
      .max(100, "Username should not exceed 100 character"),
  ]),
   password: z
    .string()
    .trim()
    .min(6, "Password should be at least 6 characters")
    .max(100, "Password should be at most 100 characters"),
});
