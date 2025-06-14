import React from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";
import { addSlide, removeSlide } from "../../slice/slidesForPptxSlice";
import CustomButton from "../../../../components/form-controls/buttons/customButton";
import { showToastNotification } from "../../../../helpers/notificationsHepler";

const SelectedDataTableComponent = ({data, columns}) => {
  const dispatch = useDispatch();

  // Transform data to match column order
  const transformedData = data.map(row => {
    return columns.map(col => row[col.name] || '');
  });

  const handleRemoveSlide = (index) => {
    dispatch(removeSlide(data[index]));
    showToastNotification("success", "Slide removed from selection");
  };

  // Custom options for the table
  const options = {
    filterType: "dropdown",
    search: true,
    searchOpen: true,
    selectableRows: "none", // Disable row selection entirely
    pagination: true,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    customToolbar: () => {
      return (
        <CustomButton 
          id="clearAll" 
          name="clearAll" 
          label="Clear All" 
          handleClick={() => {
            dispatch(addSlide([]));
            showToastNotification("success", "All slides cleared from selection");
          }} 
        />
      );
    },
    customToolbarSelect: () => {
      return null; // Disable the default toolbar
    },
    onRowClick: (rowData, rowMeta) => {
      handleRemoveSlide(rowMeta.dataIndex);
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
      filename: 'selected_slides.csv',
      separator: ',',
    },
    print: true,
    viewColumns: true,
    filter: true
  };

  return (
    <div style={{ padding: '12px' }}>
      <MUIDataTable
        title="Selected Slides"
        data={transformedData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default SelectedDataTableComponent;
