import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomButton from "../../../../components/form-controls/buttons/customButton";

const DataTableComponent = ({ data, columns }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  // State for selected row indexes
  const [selectedRowIndexes, setSelectedRowIndexes] = useState([]);

  // Custom options for the table
  const options = {
    filterType: "dropdown",
    selectableRows: "multiple",
    search: true,
    searchOpen: true,
    selectableRowsOnClick: true,
    selectableRowsHideCheckboxes: false, // Shows checkboxes for row selection
    rowsSelected: selectedRowIndexes, // Control selected rows by index

    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      // Update the selected rows based on indexes
      const selectedIndexes = allRowsSelected.map((row) => {
        row.dataIndex;
      });
      setSelectedRowIndexes(selectedIndexes);

      // Update selected row data
      const selectedData = selectedIndexes.map((index) => data[index]);
      setSelectedRows(selectedData);
    },
  };

  const handleCreatePdf = async () =>{
    // Logic for creating PDF
    console.log("Creating PDF...", selectedRows);
  }

  return (
    <div>
      <CustomButton id="CreatePdf" name="createdPdf" label="Create PDF" handleClick={handleCreatePdf} />
      <MUIDataTable
        title={"Employee List"}
        data={data.map(Object.values)} // Converts objects into arrays for display
        columns={columns}
        options={options}
      />

      <div style={{ marginTop: "20px" }}>
        <h3>Selected Rows:</h3>
        {selectedRows.length > 0 ? (
          <ul>
            {selectedRows.map((row, index) => (
              <li key={index}>
                {row}
              </li>
            ))}
          </ul>
        ) : (
          <p>No rows selected.</p>
        )}
      </div>
    </div>
  );
};

export default DataTableComponent;
