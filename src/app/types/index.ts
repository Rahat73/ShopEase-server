import { Role } from "@prisma/client";

export type IDataDisplayOptions = {
  page?: number;
  limit?: number;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
};

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
