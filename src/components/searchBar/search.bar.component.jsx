import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./search.bar.css";

const SearchBar = ({ onSearch }) => {
  const [searchBy, setSearchBy] = useState('code');
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchBy, searchText);
  };

  const handleRefresh = () => {
    setSearchBy('code');
    setSearchText('');
    onSearch('code', '');
  };

  return (
    <Box className="search-bar-row">
      <FormControl className="search-select-form" size="small">
        <InputLabel>Search By</InputLabel>
        <Select
          value={searchBy}
          label="Search By"
          onChange={(e) => setSearchBy(e.target.value)}
          size="small"
          className="search-select"
        >
          <MenuItem value="code">Code</MenuItem>
          <MenuItem value="city">City</MenuItem>
          <MenuItem value="area">Area</MenuItem>
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
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
        className="search-btn"
      >
        Search
      </Button>

      <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon />}
        onClick={handleRefresh}
        className="search-btn"
      >
        Refresh
      </Button>
    </Box>
  );
};

export default SearchBar;
