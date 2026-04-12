import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./search.bar.css";

const SearchBar = ({ onSearch }) => {
  const [searchBy, setSearchBy] = useState("code");
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchBy, searchText);
  };

  const handleRefresh = () => {
    setSearchBy("code");
    setSearchText("");
    onSearch("code", "");
  };

  return (
    <Box className="search-bar-row page-card">
      <FormControl className="search-select-form" size="small">
        <InputLabel>Search By</InputLabel>
        <Select value={searchBy} label="Search By" onChange={(e) => setSearchBy(e.target.value)}>
          <MenuItem value="code">Code</MenuItem>
          <MenuItem value="provence">Provence</MenuItem>
          <MenuItem value="city">City</MenuItem>
          <MenuItem value="area">Area</MenuItem>
          <MenuItem value="subArea">Sub Area</MenuItem>
          <MenuItem value="supplier">Supplier</MenuItem>
          <MenuItem value="mediaType">Media Type</MenuItem>
        </Select>
      </FormControl>

      <TextField
        className="search-input"
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        size="small"
        placeholder="Search slide records"
      />

      <Button variant="contained" startIcon={<SearchIcon />} onClick={handleSearch} className="search-btn">
        Search
      </Button>

      <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh} className="search-btn">
        Reset
      </Button>
    </Box>
  );
};

export default SearchBar;
