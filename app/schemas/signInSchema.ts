import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

export type SignInValues = z.infer<typeof signInSchema>;
