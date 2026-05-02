import * as z from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Địa chỉ email không hợp lệ"),
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  username: z.string().min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
