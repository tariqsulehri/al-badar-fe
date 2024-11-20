import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {setSlideId} from "../../features/slides/slice/slideSlice"
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/search.bar.component";
import SlideTable from "../slides/components/table/slide.table.component"
import {getAllSlides, deleteSlide} from "../../services/apis/slideService";
import DataGridComponent from '../../features/slides/components/grids/slides.mui.datagrid';
import DataTableComponent from '../../features/slides/components/table/slides.mui.datatable'
// import "./slides.list.component.css";



const rows = [
  { id: 1, name: 'John Doe', age: 25, city: 'New York', email: 'john@doe.com' },
  { id: 2, name: 'Jane Smith', age: 30, city: 'London', email: 'jane@smith.com' },
  { id: 3, name: 'Alice Johnson', age: 35, city: 'Paris', email: 'alice@johnson.com' },
  // More rows...
];

const COLUMNS = [
  { field: '_id', headerName: '_ID', width: 70 },
  { field: 'provence', headerName: 'Provence', width: 90 },
  { field: 'city', headerName: 'City', width: 130 },
  { field: 'area', headerName: 'Area', width: 100 },
  { field: 'supplier', headerName: 'Supplier', width: 250 },
  { field: 'mediaType', headerName: 'Media', width: 70 },
  { field: 'dimension', headerName: 'Dimension', width: 90 },
  { field: 'height_feets', headerName: 'Height', width: 60 },
  { field: 'width_feets', headerName: 'Width', width: 60 },
  { field: 'no_of_steamers', headerName: 'Steamers', width: 80 },
  { field: 'working_hrs_day', headerName: 'Work-Hrs', width: 80 },
  { field: 'lights', headerName: 'Lights', width: 70 },
  { field: 'supQuotedPrice', headerName: 'SQ-Price', width: 80 },
  { field: 'supDiscountedPrice', headerName: 'SD-Price', width: 80 },
  { field: 'finalPrice', headerName: 'CF-Price', width: 80 },
  { field: 'status', headerName: 'Status', width: 80 },
];

const SlideList = () => {

  const [filterModel, setFilterModel] = useState({
    items: [
      {
        columnField: "city",
        operatorValue: "contains",
        value: "John",
      },
    ],
  });


  const ROWS_PER_PAGE =10;
  const DEFAULT_SEARCH_TYPE = "_id"

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [columns, setColumns] = useState(COLUMNS);

  const [records, setRecords] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [pageNo, setPageNo] = useState(0);
  const [searchBy, setSearchBy] = useState(DEFAULT_SEARCH_TYPE);
  const [searchText, setSearchText] = useState("");

  const handleFilterModelChange = (newModel) => {
    if (JSON.stringify(newModel) !== JSON.stringify(filterModel)) {
      console.log('filter modal', newModel);
      setFilterModel(newModel);
    }
  };
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
      let {result, status, message}= await getAllSlides(rowsPerPage, pageNo, searchBy, searchText);
      setRecords(result.data);
      setTotalRows(totalRecords);

    } catch (error) {}
  };

  useEffect(() => {
    (async () => {
      await getRecords();
    })();
  }, []);

  const handleEdit = (id) => {
    dispatch(setSlideId(id));
    navigate(`/slides/create?id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      if (!id) throw new Error("Record not found..");
      const resp = await deleteSlide(id);
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

        {/* <SlideTable
          records={records}
          totalRows={totalRows}
          rowsPerPage={rowsPerPage}
          pageNo={pageNo}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        /> */}

      {/* <DataGridComponent rows={records} columns={columns} filterModel={filterModel} handleFilterModelChange={handleFilterModelChange} /> */}
      <DataTableComponent />
      
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

export default SlideList;
