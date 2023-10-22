import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const Edit = ({ user, onClose, onSave, enqueueSnackbar }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [selectedRole, setSelectedRole] = useState(user.role);

  // Handle changes in text fields
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  // Handle changes in the role select field
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setEditedUser({
      ...editedUser,
      role: event.target.value,
    });
  };

  // Handle saving the edited user data
  const handleSave = () => {
    // Perform validation for name, email, and role fields
    if (
      !editedUser.name.trim() ||
      !isValidEmail(editedUser.email) ||
      !editedUser.role.trim()
    ) {
      if (!isValidEmail(editedUser.email)) {
        // Display a warning message using Snackbar
        enqueueSnackbar("Please provide a valid email address.", {
          variant: "warning",
        });
        return;
      }
    }

    // Call the onSave callback to update the user data in the parent component
    onSave(editedUser);

    // Close the modal
    onClose();
  };

  // Simple email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Typography variant="h6">Edit User</Typography>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={editedUser.name}
          onChange={handleFieldChange}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={editedUser.email}
          onChange={handleFieldChange}
          sx={{ mt: 2 }}
        />
        <Select
          fullWidth
          label="Role"
          name="Role"
          value={selectedRole}
          onChange={handleRoleChange}
          sx={{ mt: 2 }}
        >
          <MenuItem value={user.role}>Select an option</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Select>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Edit;
