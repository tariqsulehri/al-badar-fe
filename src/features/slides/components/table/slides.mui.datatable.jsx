import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../../components/form-controls/buttons/customButton";
import { addSlide } from "../../../../features/slides/slice/slidesForPptxSlice";
import pptxHelper from "../../components/helpers/pptxHelper";
import PptxGenJS from "pptxgenjs";

const DataTableComponent = ({ data, columns }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIndexes, setSelectedRowIndexes] = useState([]);
  let slides = useSelector((state) => state.slidesForPptx.slidesForPptx);

  const dispatch = useDispatch();

  // Custom options for the table
  const options = {
    filterType: "dropdown",
    selectableRows: "multiple",
    search: true,
    searchOpen: true,
    selectableRowsOnClick: true,
    selectableRowsHideCheckboxes: false,
    rowsSelected: selectedRowIndexes, // Bind selected rows to state
    pagination: false, // Disable pagination
    onRowSelectionChange: (currentRowsSelected, allRowsSelected) => {
      // Extract the indexes of the selected rows
      const selectedIndexes = allRowsSelected.map((row) => row.dataIndex);

      // Update local state for selected row indexes
      setSelectedRowIndexes(selectedIndexes);

      // Get the data for selected rows
      const selectedData = selectedIndexes.map((index) => data[index]);

      // Update local state for selected rows
      setSelectedRows(selectedData);

      // Dispatch the action to update Redux state
      dispatch(addSlide(selectedData));
    },
  };

  const handleCreatePptx = async () => {
    if (slides.length === 0) {
      console.error("No slides selected to create PDF.");
      return;
    }
    try {
      let pptx = new PptxGenJS();
      await pptxHelper.createPptx(pptx, slides);
      pptx.writeFile("test.pptx");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateQuote = async () => {
    if (slides.length === 0) {
      console.error("Quote Created....");
      return;
    }
    try {
      console.error("No slides selected to create Quote.");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <CustomButton id="CreatePdf" name="createPdf" label="Create PDF" handleClick={handleCreatePptx} />
      <CustomButton id="CreateQuote" name="createQuote" label="Create Quote" handleClick={handleCreatePptx} />
      <MUIDataTable
        title="Employee List"
        data={data.map(Object.values)} // Ensure data is displayed as arrays
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DataTableComponent;
