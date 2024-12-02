import { sortingOrder } from "../constants";

type IOptions = {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

const calculatePagination = (
  options: IOptions,
  sortableFields: string[]
): IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;

  const sortBy: string =
    options.sortBy && sortableFields.includes(options.sortBy)
      ? options.sortBy
      : "createdAt";
  const sortOrder: string =
    options.sortOrder && sortingOrder.includes(options.sortOrder)
      ? options.sortOrder
      : "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const dataDisplayHelper = {
  calculatePagination,
};
