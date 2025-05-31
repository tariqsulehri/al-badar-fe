import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";
import { addSlide, removeSlide } from "../../slice/slidesForPptxSlice";
import CustomButton from "../../../../components/form-controls/buttons/customButton";

const SelectedDataTableComponent = ({data, columns}) => {
  const dispatch = useDispatch();

  // Transform data to match column order
  const transformedData = data.map(row => {
    return columns.map(col => row[col.name] || '');
  });

  const handleRemoveSlide = (index) => {
    dispatch(removeSlide(data[index]));
  };

  // Custom options for the table
  const options = {
    filterType: "dropdown",
    search: true,
    searchOpen: true,
    selectableRows: "none", // Disable row selection entirely
    pagination: false, // Disable pagination
    customToolbar: () => {
      return (
        <CustomButton 
          id="clearAll" 
          name="clearAll" 
          label="Clear All" 
          handleClick={() => dispatch(addSlide([]))} 
        />
      );
    },
    customToolbarSelect: () => {
      return null; // Disable the default toolbar
    },
    onRowClick: (rowData, rowMeta) => {
      handleRemoveSlide(rowMeta.dataIndex);
    },
  };

  return (
    <div>
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
