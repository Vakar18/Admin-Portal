import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ handleSearch }) => {
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState("");

  // State for the debouncing timer
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Function to handle debounced search
  const debounceSearch = (event) => {
    // Set the search query state
    setSearchQuery(event.target.value);

    if (debounceTimer) {
      // Clear the previous timer if it exists
      clearTimeout(debounceTimer);
    }

    // Get the current search query
    let searchQuery = event.target.value;
    let timer;

    // Set a new timer for debounced search
    timer = setTimeout(() => {
      // Call the handleSearch function with the lowercase search query
      handleSearch(searchQuery.toLowerCase());
    }, 500);

    // Update the debounce timer
    setDebounceTimer(timer);
  };

  return (
    <Box sx={{ marginTop: 1.5 }}>
      <TextField
        label="Search By Name"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(event) => debounceSearch(event)}
      />
    </Box>
  );
};

export default SearchBar;
