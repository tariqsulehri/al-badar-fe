import React, { useEffect, useState } from "react";

import "./create.subarea.css";
import LoaderSpinner from "../../../components/common/loader/loader.spinner";

const CreateSubarea= () => {

 const isLoading = false;

  // if (isLoading) {
  //   return (
  //       <LoaderSpinner size={32} role="status" className="spinner-border" />
  //   );
  // }

  // if (isError) {
  //   return (
  //       <h1> Something went wrong</h1>
  //   );
  // }

  return (
    <div className="create-user-wrapper">
      <div className="create-user-box box-wrapper">
        <h1 className="heading-page">{"Create Subarea"}</h1>
      </div>
    </div>
  );
};
export default CreateSubarea;
