import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { addSlide } from "../../slice/slidesForPptxSlice";

const SelectedDataTableComponent = ({data, columns}) => {
  // Custom options for the table
  const options = {
    filterType: "dropdown",
    search: true,
    searchOpen: true,
    selectableRows: "none", // Disable row selection entirely
    pagination: false, // Disable pagination
  };


  return (
    <div>
      <MUIDataTable
        title="Selected Slides"
        data={data.map(Object.values)} // Ensure data is displayed as arrays
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default SelectedDataTableComponent;
