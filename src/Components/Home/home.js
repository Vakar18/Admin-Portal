import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Header from "../Header/header";
import SearchBar from "../SearchBar/searchbar";
import TableComponent from "../Table/table";
import Edit from "../EditOption/edit";
import CustomPagination from "../Pagination/pagination";
import { fetchUsers } from "../ApiCall/api";
import { Button, Typography, Box } from "@mui/material";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { useSnackbar } from "notistack";

const Home = () => {
  // State and initialization
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editUserId, setEditUserId] = useState(null);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch user data from an API
  const fetchData = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle search input and filter users
  const handleSearch = (query) => {
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredUsers(filteredData);
    setSearchQuery(query);
    setPage(0);
  };

  // Change the current page when the pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Change the number of rows displayed per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle row selection
  const handleRowSelect = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }

    if (selectedForDeletion.includes(userId)) {
      setSelectedForDeletion(selectedForDeletion.filter((id) => id !== userId));
    } else {
      setSelectedForDeletion([...selectedForDeletion, userId]);
    }
  };

  // Handle user edit
  const handleEdit = (userId) => {
    setEditUserId(userId);
  };

  // Handle save after editing user data
  const handleSave = (editedUser) => {
    setFilteredUsers((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === editedUser.id ? { ...user, ...editedUser } : user
      );
    });
    enqueueSnackbar("Record updated successfully", { variant: "success" });
    setEditUserId(null);
  };

  // Handle user deletion
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setFilteredUsers(filteredUsers.filter((user) => user.id !== userId));
      setSelectedRows(selectedRows.filter((id) => id !== userId));
      enqueueSnackbar("Selected user deleted successfully", {
        variant: "success",
      });
    }
  };

  // Handle deletion of selected rows
  const handleDeleteSelected = () => {
    if (selectedForDeletion.length === 0) {
      return;
    }

    if (window.confirm("Are you sure you want to delete the selected rows?")) {
      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => !selectedForDeletion.includes(user.id))
      );
      setSelectedForDeletion([]);
      enqueueSnackbar("Selected users deleted successfully", {
        variant: "success",
      });
    }
  };

  // Calculate the range of users to display on the current page
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const visibleUsers = filteredUsers
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(start, end);

  return (
    <Container>
      <Header />
      <SearchBar handleSearch={handleSearch} />

      {noResults ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <MoodBadIcon sx={{ fontSize: 36, mr: 2 }} />
          <Typography variant="subtitle1">Sorry, No results found.</Typography>
        </Box>
      ) : (
        <TableComponent
          users={visibleUsers}
          selectedRows={selectedRows}
          handleRowSelect={(userId) => handleRowSelect(userId)}
          handleEdit={(userId) => handleEdit(userId)}
          handleDelete={(userId) => handleDelete(userId)}
        />
      )}

      <CustomPagination
        rowsPerPage={rowsPerPage}
        count={filteredUsers.length}
        totalPages={totalPages}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {selectedForDeletion.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            p: 2,
            bgcolor: "background.paper",
            boxShadow: 4,
            zIndex: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {selectedForDeletion.length} selected
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteSelected}
          >
            Delete
          </Button>
        </Box>
      )}

      {editUserId !== null && (
        <Edit
          userId={editUserId}
          user={filteredUsers.find((user) => user.id === editUserId)}
          onClose={() => setEditUserId(null)}
          onSave={(editedUser) => handleSave(editedUser)}
          enqueueSnackbar={enqueueSnackbar}
        />
      )}
    </Container>
  );
};

export default Home;
