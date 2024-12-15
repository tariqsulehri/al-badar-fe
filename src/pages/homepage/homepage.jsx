import React, { useState } from "react";

import { fetchFromStore } from "../../utils/fetchFromStore";
import PropTypes from "prop-types";

const Home = () => {
  /** const { currentUser } = useSelector((state) => state.auth); */
  const { currentUser } = fetchFromStore("auth");
  let [formData, setFormData] = useState({
    code: "1234AB",
    supplier: "Sup1",
    provence: "Punjab",
    city: "Ahmadpur East",
    area: "DHA",
    subArea: "DHA Phase-1",
    mediaType: "Digital",
    height_feets: "101",
    width_feets: "201",
    location_from: "location from-abc",
    location_to: "location to1-abc",
    smd_screen: "smd1-abc",
    no_of_steamers: "101",
    working_hrs_day: "11",
    ad_duration: "21",
    no_of_spots: "11",
    rate_per_week: "12",
    trafic_facing_coming: "FTCF1",
    facing_trafic_going: "TGT1",
    category: "B",
    dimension: "Horizontal",
    lights: "Available",
    supQuotedPrice: "4000",
    supDiscountedPrice: "3800",
    supFinalPrice: "3800",
    quotedPrice: "",
    discountedPrice: "",
    finalPrice: "",
    latitude: "112.44444",
    longitude: "longitude",
    eyeBall: "eyeBall1",
    status: "Not Available",
    is_active: true,
    image: "./landscapejpeg",
  });

  return (
    <div id="homepage">
      <h2> Home Page </h2>
      <h2>{currentUser ? currentUser.name : ""}</h2>
    </div>
  );
};

Home.propTypes = {};
export default Home;
