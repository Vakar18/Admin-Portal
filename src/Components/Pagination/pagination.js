import React from "react";
import { TablePagination } from "@mui/material";

const CustomPagination = ({
  rowsPerPage,
  count,
  page,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  return (
    <TablePagination
    rowsPerPageOptions={[5, 10, 25]}
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={onChangePage}
    onRowsPerPageChange={onChangeRowsPerPage}
    />
  );
};

export default CustomPagination;
