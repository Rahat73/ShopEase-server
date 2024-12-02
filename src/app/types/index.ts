import { Role } from "@prisma/client";

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
}

export type IAuthUser = {
  email: string;
  role: Role;
} | null;
