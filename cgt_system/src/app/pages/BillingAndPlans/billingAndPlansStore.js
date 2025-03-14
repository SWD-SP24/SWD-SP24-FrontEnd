import { signify } from "react-signify";

export const sBillings = signify([]);
export const sPagination = signify({
  currentPage: 1,
  totalItems: 0,
  totalPages: 0,
  itemsPerPage: 10,
});
