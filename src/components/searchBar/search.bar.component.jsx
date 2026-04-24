import React, { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import "./search.bar.css";

const SEARCH_FIELDS = [
  { value: "all", label: "All Fields" },
  { value: "code", label: "Code" },
  { value: "supplier", label: "Supplier" },
  { value: "provence", label: "Province" },
  { value: "city", label: "City" },
  { value: "area", label: "Area" },
  { value: "subArea", label: "Sub Area" },
  { value: "mediaType", label: "Media Type" },
  { value: "dimension", label: "Dimension" },
  { value: "lights", label: "Lights" },
  { value: "status", label: "Status" },
  { value: "category", label: "Category" },
  { value: "finalPrice", label: "Final Price" },
  { value: "supQuotedPrice", label: "Supplier Quote" },
];

const SearchBar = ({ onSearch }) => {
  const [searchBy, setSearchBy] = useState("code");
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchBy, searchText.trim());
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
          {SEARCH_FIELDS.map((field) => (
            <MenuItem key={field.value} value={field.value}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        className="search-input"
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
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
