import React, { useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function TableComponent(props) {
  const { users, selectedRows, handleRowSelect, handleEdit, handleDelete } =
    props;
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");

  // Function to handle sorting
  const createSortHandler = (property) => () => {
    handleRequestSort(property);
  };

  // Function to handle sorting request
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Sort users based on the selected column and order
  const sortedUsers = users.slice().sort((a, b) => {
    const isAsc = order === "asc";
    return isAsc ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
  });

  // Function to handle row click
  const handleClick = (event, userId) => {
    // Prevent row selection if the user clicks on the Edit or Delete buttons
    if (
      event.target.type === "button" ||
      event.target.tagName === "svg" ||
      event.target.tagName === "path"
    ) {
      return;
    }
    handleRowSelect(userId);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <Typography
                variant="h5"
                color="inherit"
                component="div"
                onClick={createSortHandler("id")}
                style={{ cursor: "pointer" }}
              >
                ID
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h5"
                color="inherit"
                component="div"
              >
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h5"
                color="inherit"
                component="div"
              >
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h5"
                color="inherit"
                component="div"
              >
                Role
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h5"
                color="inherit"
                component="div"
              >
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow
              hover
              key={user.id}
              onClick={(event) => handleClick(event, user.id)}
              style={{ cursor: "pointer" }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelect(user.id)}
                  inputProps={{
                    "aria-label": `select user ${user.id}`,
                  }}
                />
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEdit(user.id)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(user.id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableComponent.propTypes = {
  users: PropTypes.array.isRequired,
  selectedRows: PropTypes.array.isRequired,
  handleRowSelect: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TableComponent;
