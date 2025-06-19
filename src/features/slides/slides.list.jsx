import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSlideId } from "../../features/slides/slice/slideSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/search.bar.component";
import { getAllSlides } from "../../services/apis/slideService";
import SlidesDataTable from "../../features/slides/components/table/slides.mui.datatable";
import { showToastNotification } from "../../helpers/notificationsHepler";

const columns = [
  { 
    name: "_id", 
    label: "_ID",
    options: {
      display: false,
      filter: false,
      sort: false
    }
  },
  { name: "provence", label: "Provence" },
  { name: "city", label: "City" },
  { name: "area", label: "Area" },
  { name: "supplier", label: "Supplier" },
  { name: "mediaType", label: "Media" },
  { name: "dimension", label: "Dimension" },
  { name: "height_feets", label: "Height" },
  { name: "width_feets", label: "Width" },
  { name: "no_of_steamers", label: "Steamers" },
  { name: "working_hrs_day", label: "Work-Hrs" },
  { name: "lights", label: "Lights" },
  { name: "supQuotedPrice", label: "SQ-Price" },
  { name: "supDiscountedPrice", label: "SD-Price" },
  { name: "finalPrice", label: "CF-Price" },
  { name: "status", label: "Status" },
];

const SlideList = () => {
  const [slides, setSlides] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchBy, setSearchBy] = useState("code");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const response = await getAllSlides(rowsPerPage, page + 1, searchBy, searchText);
      
      if (response && response.data) {
        console.log('Setting slides data:', response.data);
        setSlides(response.data);
        setTotalRows(response.totalRecords || response.data.length);
      } else {
        console.log('No data in response');
        showToastNotification("error", "No data received from server");
        setSlides([]);
        setTotalRows(0);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
      showToastNotification("error", "Failed to fetch slides");
      setSlides([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, [page, rowsPerPage, searchBy, searchText]);

  const handlePageChange = (newPage) => {
    console.log('Page changed to:', newPage);
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    console.log('Rows per page changed to:', newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page when changing rows per page
  };

  const handleSearch = (searchBy, searchText) => {
    setSearchBy(searchBy);
    setSearchText(searchText);
    setPage(0);
    if(searchBy !== "" || searchText !== ""){
       fetchSlides(searchBy, searchText);
    }
  };

  console.log('Current slides state:', slides);

  return (
    <div style={{ padding: '20px' }}>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
      ) : slides && slides.length > 0 ? (
        <SlidesDataTable
          data={slides}
          columns={columns}
          totalRows={totalRows}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          {loading ? 'Loading...' : 'No data available'}
        </div>
      )}
    </div>
  );
};

export default SlideList;
