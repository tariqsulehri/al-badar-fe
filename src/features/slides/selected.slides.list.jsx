import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SelectedDataTableComponent from "./components/table/selected.slides.datatable";

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
  let slides = useSelector((state) => state.slidesForPptx.slidesForPptx);
  useEffect(() => {
  }, []);

  if (slides && slides.length > 0) {
    return (
      <>
        <SelectedDataTableComponent data={slides} columns={columns} />
      </>
    );
  } else {
    return <div>No Slide Found</div>;
  }
};

export default SelectedSlideList;
