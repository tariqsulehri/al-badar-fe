import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';

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
    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Search By</InputLabel>
        <Select
          value={searchBy}
          label="Search By"
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <MenuItem value="code">Code</MenuItem>
          <MenuItem value="city">City</MenuItem>
          <MenuItem value="area">Area</MenuItem>
          <MenuItem value="supplier">Supplier</MenuItem>
          <MenuItem value="mediaType">Media Type</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
        sx={{ height: 56 }}
      >
        Search
      </Button>

      <Button
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={handleRefresh}
        sx={{ height: 56 }}
      >
        Refresh
      </Button>
    </Box>
  );
};

export default SearchBar;
