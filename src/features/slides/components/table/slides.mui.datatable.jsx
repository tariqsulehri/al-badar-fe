import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";

const DataTableComponent = () => {
  // Sample columns definition
  const columns = [
    {
      name: "name",
      label: "Name",
    },
    {
      name: "title",
      label: "Title",
    },
    {
      name: "location",
      label: "Location",
    },
    {
      name: "age",
      label: "Age",
    },
  ];

  const [selectedRows, setSelectedRows] = useState([]);

  // Sample data
  const data = [
    { name: "John Doe", title: "Software Engineer", location: "New York", age: 28 },
    { name: "Jane Smith", title: "Project Manager", location: "London", age: 34 },
    { name: "Sam Green", title: "Designer", location: "Sydney", age: 29 },
    { name: "Alex Blue", title: "DevOps Engineer", location: "Toronto", age: 32 },
  ];

  // State for selected row indexes
  const [selectedRowIndexes, setSelectedRowIndexes] = useState([]);

  // Custom options for the table
  const options = {
    filterType: 'dropdown',
    selectableRows: 'multiple',
    search:true,
    searchOpen:true,
    selectableRowsOnClick: true,
    selectableRowsHideCheckboxes: false, // Shows checkboxes for row selection
    rowsSelected: selectedRowIndexes, // Control selected rows by index

    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      // Update the selected rows based on indexes
      const selectedIndexes = allRowsSelected.map(row => row.dataIndex);
      setSelectedRowIndexes(selectedIndexes);

      // Update selected row data
      const selectedData = selectedIndexes.map(index => data[index]);
      setSelectedRows(selectedData);
    },
  };

  return (
    <div>
      <MUIDataTable
        title={"Employee List"}
        data={data.map(Object.values)} // Converts objects into arrays for display
        columns={columns}
        options={options}
      />

      <div style={{ marginTop: '20px' }}>
        <h3>Selected Rows:</h3>
        {selectedRows.length > 0 ? (
          <ul>
            {selectedRows.map((row, index) => (
              <li key={index}>
                {row.name} - {row.title} - {row.location} - Age: {row.age}
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
