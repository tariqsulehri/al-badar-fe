import React, { useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../../components/form-controls/buttons/customButton";
import { addSlide, clearSlides, setPagination } from "../../../../features/slides/slice/slidesForPptxSlice";
import { setSlideId } from "../../../../features/slides/slice/slideSlice";
import pptxHelper from "../../components/helpers/pptxHelper";
import PptxGenJS from "pptxgenjs";
import { showToastNotification } from "../../../../helpers/notificationsHepler";

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

const DataTableComponent = ({ data = [], columns, totalRows, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedSlides = useSelector((state) => state.slidesForPptx.slidesForPptx);
  const selectedSlideIds = useSelector((state) => state.slidesForPptx.selectedSlideIds);

  console.log('DataTable received data:', data);

  // Transform data to match column order and add selection state
  const transformedData = useMemo(() => {
    console.log('Transforming data:', data);
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return [];
    }

    return data.map(row => {
      if (!row) {
        console.warn('Row is undefined or null');
        return columns.map(() => '');
      }

      return columns.map(col => {
        const value = row[col.name];
        console.log(`Column ${col.name}:`, value);
        // Handle null/undefined values
        if (value === null || value === undefined) return '';
        // Handle numbers
        if (typeof value === 'number') return value.toString();
        // Handle objects
        if (typeof value === 'object') return JSON.stringify(value);
        // Handle strings and other types
        return value;
      });
    });
  }, [data, columns]);

  console.log('Transformed data:', transformedData);

  // Get selected row indexes for current page
  const getSelectedRowIndexes = () => {
    if (!Array.isArray(data)) return [];
    if (!selectedSlideIds || typeof selectedSlideIds !== 'object') return [];
    
    return data
      .map((row, index) => {
        if (!row || !row._id) return -1;
        // Add defensive check for selectedSlideIds[row._id]
        return selectedSlideIds[row._id] === true ? index : -1;
      })
      .filter(index => index !== -1);
  };

  // Custom options for the table
  const options = {
    filterType: "dropdown",
    selectableRows: "multiple",
    search: true,
    searchOpen: true,
    selectableRowsOnClick: false,
    selectableRowsHideCheckboxes: false,
    rowsSelected: getSelectedRowIndexes(),
    pagination: true,
    count: totalRows || 0,
    page: page || 0,
    rowsPerPage: rowsPerPage || 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    serverSide: true,
    onRowClick: (rowData, rowMeta) => {
      const row = data[rowMeta.dataIndex];
      if (row && row._id) {
        handleSelectSlide(row._id);
      }
    },
    onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
      const selectedIndexes = allRowsSelected.map((row) => row.dataIndex);
      const selectedData = selectedIndexes
        .map((index) => data[index])
        .filter(Boolean);
      dispatch(addSlide(selectedData));
    },
    onChangePage: (newPage) => {
      console.log('Table page changed to:', newPage);
      dispatch(setPagination({ page: newPage, rowsPerPage }));
      onPageChange(newPage);
    },
    onChangeRowsPerPage: (numberOfRows) => {
      console.log('Table rows per page changed to:', numberOfRows);
      dispatch(setPagination({ page: 0, rowsPerPage: numberOfRows }));
      onRowsPerPageChange(numberOfRows);
    },
    textLabels: {
      body: {
        noMatch: "No matching records found",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of"
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table"
      },
      filter: {
        all: "All",
        title: "FILTERS",
        reset: "RESET"
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns"
      },
      selectedRows: {
        text: "rows selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows"
      }
    },
    setTableProps: () => ({
      style: {
        fontSize: '0.8125rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }
    }),
    setRowProps: () => ({
      style: {
        fontSize: '0.8125rem',
        height: '32px',
        padding: '4px 8px'
      }
    }),
    setHeaderProps: () => ({
      style: {
        fontSize: '0.8125rem',
        fontWeight: 600,
        height: '40px',
        padding: '4px 8px'
      }
    }),
    responsive: 'standard',
    tableBodyHeight: 'auto',
    tableBodyMaxHeight: 'calc(100vh - 200px)',
    fixedHeader: true,
    elevation: 0,
    downloadOptions: {
      filename: 'slides.csv',
      separator: ',',
    },
    print: true,
    viewColumns: true,
    filter: true,
    customToolbarSelect: () => {
      return null; // Disable the default selection toolbar
    }
  };

  const handleCreatePptx = async () => {
    if (!selectedSlides || selectedSlides.length === 0) {
      console.error("No slides selected to create PDF.");
      return;
    }
    try {
      let pptx = new PptxGenJS();
      await pptxHelper.createPptx(pptx, selectedSlides);
      pptx.writeFile("test.pptx");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleViewSelected = () => {
    if (!selectedSlides || selectedSlides.length === 0) {
      console.error("No slides selected.");
      return;
    }
    navigate('/slides/selected_slides');
  };

  const handleSelectSlide = async (slideId) => {
    if (!slideId) {
      console.error("Invalid slide ID");
      return;
    }
    try {
      dispatch(setSlideId(slideId));
      navigate("/slides/create");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ 
      padding: '12px', // Reduced padding
      display: 'flex',
      flexDirection: 'column',
      gap: '8px' // Reduced gap between elements
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '8px', // Reduced gap between buttons
        flexWrap: 'wrap' // Allow buttons to wrap on smaller screens
      }}>
        <CustomButton 
          id="createPdf" 
          name="createPdf" 
          label="Create PDF" 
          handleClick={handleCreatePptx} 
        />
        <CustomButton 
          id="viewSelected" 
          name="viewSelected" 
          label="View Selected" 
          handleClick={handleViewSelected} 
        />
        <CustomButton 
          id="selectAll" 
          name="selectAll" 
          label="Select All" 
          handleClick={() => {
            const validData = data.filter(Boolean);
            dispatch(addSlide(validData));
            showToastNotification("success", "All slides selected successfully");
          }} 
        />
        <CustomButton 
          id="clearSelection" 
          name="clearSelection" 
          label="Clear Selection" 
          handleClick={() => {
            dispatch(clearSlides());
            showToastNotification("success", "Selection cleared successfully");
          }} 
        />
      </div>
      <MUIDataTable
        title="Slides List"
        data={transformedData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DataTableComponent;
