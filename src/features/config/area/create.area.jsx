import React, { useEffect, useState } from "react";
import "./create.area.css";

import LoaderSpinner from "../../../components/common/loader/loader.spinner";

const CreateArea = () => {

//  const isLoading = false;

//   if (isLoading) {
//     return (
//         <LoaderSpinner size={32} role="status" className="spinner-border" />
//     );
//   }

//   if (isError) {
//     return (
//         <h1> Something went wrong</h1>
//     );
//   }

  return (
    <div className="create-user-wrapper">
      <div className="create-user-box box-wrapper">
        <h1 className="heading-page">{"Creat Area"}</h1>
      </div>
    </div>
  );
};
export default CreateArea;
