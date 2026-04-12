import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import PptxGenJS from "pptxgenjs";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../../components/form-controls/buttons/customButton";
import { addSlide, clearSlides, setPagination } from "../../../../features/slides/slice/slidesForPptxSlice";
import { setSlideId } from "../../../../features/slides/slice/slideSlice";
import pptxHelper from "../../components/helpers/pptxHelper";
import { showToastNotification } from "../../../../helpers/notificationsHepler";
import "./slide.table.css";

const columns = [
  { name: "_id", label: "ID", options: { display: false, filter: false, sort: false } },
  { name: "code", label: "Code" },
  { name: "provence", label: "Provence" },
  { name: "city", label: "City" },
  { name: "area", label: "Area" },
  { name: "subArea", label: "Sub Area" },
  { name: "supplier", label: "Supplier" },
  { name: "mediaType", label: "Media Type" },
  { name: "dimension", label: "Dimension" },
  { name: "height_feets", label: "Height" },
  { name: "width_feets", label: "Width" },
  { name: "lights", label: "Lights" },
  { name: "supQuotedPrice", label: "Supplier Quote" },
  { name: "finalPrice", label: "Final Price" },
  { name: "status", label: "Status" },
];

const SlidesDataTable = ({ data = [], totalRows, page, rowsPerPage, loading, onPageChange, onRowsPerPageChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedSlides = useSelector((state) => state.slidesForPptx.slidesForPptx);
  const selectedSlideIds = useSelector((state) => state.slidesForPptx.selectedSlideIds);

  const rowsSelected = useMemo(() => {
    return data
      .map((row, index) => (selectedSlideIds?.[row?._id] ? index : -1))
      .filter((index) => index !== -1);
  }, [data, selectedSlideIds]);

  const handleCreatePptx = async () => {
    if (!selectedSlides || selectedSlides.length === 0) {
      showToastNotification("error", "Please select slides first");
      return;
    }

    try {
      const pptx = new PptxGenJS();
      await pptxHelper.createPptx(pptx, selectedSlides);
      await pptx.writeFile("test.pptx");
    } catch (error) {
      showToastNotification("error", "Failed to create PPTX");
    }
  };

  const options = {
    filter: false,
    search: false,
    download: false,
    print: false,
    viewColumns: true,
    selectableRows: "multiple",
    selectableRowsOnClick: false,
    selectableRowsHideCheckboxes: false,
    rowsSelected,
    count: totalRows || 0,
    page: page || 0,
    rowsPerPage: rowsPerPage || 10,
    rowsPerPageOptions: [5, 10, 20, 50],
    serverSide: true,
    responsive: "standard",
    elevation: 0,
    textLabels: {
      body: {
        noMatch: loading ? "Loading slides..." : "No slides found",
      },
    },
    setTableProps: () => ({
      className: "slides-table",
    }),
    onRowClick: (_, rowMeta) => {
      const row = data[rowMeta.dataIndex];
      if (row?._id) {
        dispatch(setSlideId(row._id));
        navigate("/slides/create");
      }
    },
    onRowSelectionChange: (_, allRowsSelected) => {
      const selectedIndexes = allRowsSelected.map((row) => row.dataIndex);
      const selectedData = selectedIndexes.map((index) => data[index]).filter(Boolean);
      dispatch(addSlide(selectedData));
    },
    onChangePage: (newPage) => {
      dispatch(setPagination({ page: newPage, rowsPerPage }));
      onPageChange(newPage);
    },
    onChangeRowsPerPage: (numberOfRows) => {
      dispatch(setPagination({ page: 0, rowsPerPage: numberOfRows }));
      onRowsPerPageChange(numberOfRows);
    },
    customToolbar: () => (
      <div className="slides-table__toolbar">
        <CustomButton label="Create PPTX" handleClick={handleCreatePptx} />
        <CustomButton
          label="View Selected"
          handleClick={() => navigate("/slides/selected_slides")}
          variant="outlined"
        />
        <CustomButton
          label="Select All"
          handleClick={() => {
            dispatch(addSlide(data.filter(Boolean)));
            showToastNotification("success", "Current page selected");
          }}
          variant="outlined"
        />
        <CustomButton
          label="Clear Selection"
          handleClick={() => {
            dispatch(clearSlides());
            showToastNotification("success", "Selection cleared");
          }}
          variant="outlined"
        />
      </div>
    ),
  };

  return (
    <div className="slides-table-shell page-card">
      <MUIDataTable title={null} data={data} columns={columns} options={options} />
    </div>
  );
};

export default SlidesDataTable;
