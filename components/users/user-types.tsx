export interface User {
  id: string;
  username: string;
  email: string;
  studentId: string;
  role: "student" | "admin" | "teacher";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  otpExpiry?: string;
  otpToken?: string;
}
