import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedDataTableComponent from "./components/table/selected.slides.datatable";
import CustomButton from "../../components/form-controls/buttons/customButton";
import PptxGenJS from "pptxgenjs";
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
  const navigate = useNavigate();
  const slides = useSelector((state) => state.slidesForPptx.slidesForPptx);

  const handleCreatePptx = async () => {
    if (slides.length === 0) {
      console.error("No slides selected to create PDF.");
      return;
    }
    try {
      let pptx = new PptxGenJS();
      await pptxHelper.createPptx(pptx, slides);
      pptx.writeFile("selected_slides.pptx");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBackToList = () => {
    navigate('/slides/list');
  };

  if (slides && slides.length > 0) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <CustomButton 
            id="createPptx" 
            name="createPptx" 
            label="Create PPTX" 
            handleClick={handleCreatePptx} 
          />
          <CustomButton 
            id="backToList" 
            name="backToList" 
            label="Back to List" 
            handleClick={handleBackToList} 
          />
        </div>
        <SelectedDataTableComponent data={slides} columns={columns} />
      </div>
    );
  } else {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>No Slides Selected</h2>
        <CustomButton 
          id="backToList" 
          name="backToList" 
          label="Back to List" 
          handleClick={handleBackToList} 
        />
      </div>
    );
  }
};

export default SelectedSlideList;
