import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSlideId } from "./slice/slideSlice";
import PptxGenJS from "pptxgenjs";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/search.bar.component";
import { getAllSlides, deleteSlide } from "../../services/apis/slideService";
import SlidesDataTable from "./components/table/slides.mui.datatable";
import pptxHelper from "./components/helpers/pptxHelper";

const columns = [
  { name: "_id", label: "_ID" },
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

const SelectedSlideList = () => {
  const slides = useSelector((state) => state.slidesForPptx);

  const [filterModel, setFilterModel] = useState({
    items: [
      {
        columnField: "city",
        operatorValue: "contains",
        value: "John",
      },
    ],
  });

  const ROWS_PER_PAGE = 10;
  const DEFAULT_SEARCH_TYPE = "_id";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [records, setRecords] = useState(null);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [pageNo, setPageNo] = useState(0);
  const [searchBy, setSearchBy] = useState(DEFAULT_SEARCH_TYPE);
  const [searchText, setSearchText] = useState("");

  const handleFilterModelChange = (newModel) => {
    if (JSON.stringify(newModel) !== JSON.stringify(filterModel)) {
      console.log("filter modal", newModel);
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

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNo(0);
    await getRecords();
  };

  useEffect(() => {
    setRecords(slides);
  }, []);

  if (records && records.length > 0) {
    return (
      <>
        <SlidesDataTable data={records} columns={columns} />
      </>
    );
  } else {
    return <div>No Slide Found</div>;
  }
};

export default SelectedSlideList;
