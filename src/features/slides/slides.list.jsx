import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSlideId } from "../../features/slides/slice/slideSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/search.bar.component";
import { getAllSlides, deleteSlide } from "../../services/apis/slideService";
import DataGridComponent from "../../features/slides/components/grids/slides.mui.datagrid";
import SlidesDataTable from "../../features/slides/components/table/slides.mui.datatable";
import pptxHelper from "../../features/slides/components/helpers/pptxHelper";
import PptxGenJS from "pptxgenjs";

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
      let { result, status, message } = await getAllSlides(rowsPerPage, pageNo, searchBy, searchText);
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
        <button
          onClick={async () => {

            try {
              let pptx = new PptxGenJS();
              await pptxHelper.createPptx(pptx,records);
              pptx.writeFile("test.pptx");
            } catch (error) {
              console.log(error.message);
            }
            // let pptx=new PptxGenJS();
            
            // try {
            




              //let pptx = new PptxGenJS();

              //for (let i = 0; i < 10; i++) {
              
                // let slide = pptx.addSlide();

          
              // pptx.writeFile("test.pptx");
           // } catch (error) {
           //   console.log(error.message);
          //  }
          }}
        >
          Creat PPTX
        </button>
        <SearchBar searchBy={searchBy} searchText={searchText} onChangeSearchBy={handleChangeSearchBy} onSearchChange={handleSearchChange} handleSearch={handleSearch} />

        {/* <DataGridComponent rows={records} columns={columns} filterModel={filterModel} handleFilterModelChange={handleFilterModelChange} /> */}
        <SlidesDataTable data={records} columns={columns} />
      </>
    );
  } else {
    return (
      <>
        <SearchBar searchBy={searchBy} searchText={searchText} onChangeSearchBy={handleChangeSearchBy} onSearchChange={handleSearchChange} handleSearch={handleSearch} />
      </>
    );
  }
};

export default SlideList;

{
  /* <table id="tableId" width={"100%"}>
        <tbody>
          <tr style={{ height: "10px;" }}>
            <td>code:</td> <td>{formData.code}</td>
            <td rowspan="21">
              <img style={{ width: "100%", height: "100%", objectFit: "contain" }} src={"./test.jpg"} />
            </td>
          </tr>
          <tr style={{ height: "10px;" }}>
            <td>supplier</td> <td>{formData.supplier}</td>
          </tr>
          <tr style={{ height: "10px;" }}>
            <td>provence</td> <td>{formData.provence}</td>
          </tr>
          <tr style={{ height: "10px;" }}>
            <td>city</td> <td>{formData.city}</td>
          </tr>
          <tr>
            <td>city</td> <td>{formData.city}</td>
          </tr>
          <tr>
            <td>location_from</td> <td>{formData.location_from}</td>
          </tr>
          <tr>
            <td>location_to</td> <td>{formData.location_to}</td>
          </tr>
          <tr>
            <td>smd_screen</td> <td>{formData.smd_screen}</td>
          </tr>
          <tr>
            <td>no_of_steamers</td> <td>{formData.no_of_steamers}</td>
          </tr>
          <tr>
            <td>working_hrs_day</td> <td>{formData.working_hrs_day}</td>
          </tr>
          <tr>
            <td>no_of_spots</td> <td>{formData.no_of_spots}</td>
          </tr>
          <tr>
            <td>rate_per_week</td> <td>{formData.rate_per_week}</td>
          </tr>
          <tr>
            <td>trafic_facing_coming</td> <td>{formData.trafic_facing_coming}</td>
          </tr>
          <tr>
            <td>facing_trafic_going</td> <td>{formData.facing_trafic_going}</td>
          </tr>
          <tr>
            <td>category</td> <td>{formData.category}</td>
          </tr>
          <tr>
            <td>dimension</td> <td>{formData.dimension}</td>
          </tr>
          <tr>
            <td>lights</td> <td>{formData.lights}</td>
          </tr>
          <tr>
            <td>latitude</td> <td>{formData.latitude}</td>
          </tr>
          <tr>
            <td>longitude</td> <td>{formData.longitude}</td>
          </tr>
          <tr>
            <td>eyeBall</td> <td>{formData.eyeBall}</td>
          </tr>
          <tr>
            <td>status</td> <td>{formData.status}</td>
          </tr>
        </tbody>
      </table> */
}
