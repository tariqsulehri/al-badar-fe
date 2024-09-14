import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setId } from "../../../features/config/provience/slice/provSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/searchBar/search.bar.component";
import ConfigTable from "../components/configTable/config.table.component";
import {getAllProv, deleteProv} from "../../../services/apis/config/provService";

import "./prov.list.css";

const ListProv = () => {
  
  const ROWS_PER_PAGE =10;
  const DEFAULT_SEARCH_TYPE = "_id"

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [records, setRecords] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [pageNo, setPageNo] = useState(0);
  const [searchBy, setSearchBy] = useState(DEFAULT_SEARCH_TYPE);
  const [searchText, setSearchText] = useState("");

  const handleChangeSearchBy = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = async () => {
    setPageNo(0);
    await getRecords();
  };

  const handleChangePage = async (event, newPage) => {
    setPageNo(newPage);
    await getRecords();
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNo(0);
    await getRecords();
  };

  const getRecords = async () => {
    try {
      let {data, totalRecords} = await getAllProv(rowsPerPage, pageNo, searchBy, searchText);
      setRecords(data);
      setTotalRows(totalRecords);

    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await getRecords();
    })();
  }, []);

  const handleEdit = (id) => {
    dispatch(setId(id));
    navigate(`/setup/prov/create?id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      if (!id) throw new Error("Record not found..");
      const resp = await deleteProv(id);
      await getRecords();
    } catch (error) {
      console.log("Error Deleting Record", error.message);
    }
  };

  if (records && records.length > 0) {
    return (
      <>
        <SearchBar searchBy={searchBy} 
                   searchText={searchText} 
                   onChangeSearchBy={handleChangeSearchBy} 
                   onSearchChange={handleSearchChange} 
                   handleSearch={handleSearch} 
        />
        <ConfigTable
          records={records}
          totalRows={totalRows}
          rowsPerPage={rowsPerPage}
          pageNo={pageNo}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </>
    );
  } else {
    return (
      <>
        <SearchBar searchBy={searchBy} 
                   searchText={searchText} 
                   onChangeSearchBy={handleChangeSearchBy} 
                   onSearchChange={handleSearchChange} 
                   handleSearch={handleSearch} 
        />
      </>
    );
  }
};

export default ListProv;
