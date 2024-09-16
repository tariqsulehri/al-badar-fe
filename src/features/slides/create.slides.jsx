import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SlideDetail from "../slides/components/cards/slideDetail.component";
import ImageCard from "../slides/components/cards/imageCard.component";
import { getAllProvencsForSelection } from "../../services/apis/config/provService";
import { getAllCitiesForSelection } from "../../services/apis/config/cityService";
import { getAllAreasForSelection } from "../../services/apis/config/areaService";
import { getAllSubAreasForSelection } from "../../services/apis/config/subAreaService";
import { suppliers, lights, category, mediaTypes, dimension, status } from "../../constant/data";


import axios from "axios";
import { createSlide, findSlideById } from "../../services/apis/slideService";

const CreateSlide = function () {
  let id = useSelector((state) => state.slide.slideId || null);
  id = id?.payload;

  let [previewImage, setPreviewImage] = useState("");
  let [provences, setProvences] = useState([]);
  let [cities, setCities] = useState([]);
  let [areas, setAreas] = useState([]);
  let [subAreas, setSubAreas] = useState([]);

  let [formData, setFormData] = useState({
    code: "",
    supplier: "",
    provence: "",
    city: "",
    area: "",
    subArea: "",
    mediaType: "",
    height_feets: "",
    width_feets: "",
    location_from: "",
    location_to: "",
    smd_screen: "",
    no_of_steamers: "",
    working_hrs_day: "",
    ad_duration: "",
    no_of_spots: "",
    rate_per_week: "0",
    trafic_facing_coming: "",
    facing_trafic_going: "",
    category: "",
    dimension: "",
    lights: "",
    supQuotedPrice: "",
    supDiscountedPrice: "",
    supFinalPrice: "",
    quotedPrice: "",
    discountedPrice: "",
    finalPrice: "",
    latitude: "",
    longitude: "",
    eyeBall: "",
    status: "",
    is_active: true,
    image: previewImage,
  });

  const getProvences = async () => {
    try {
      let resp = await getAllProvencsForSelection();
      await setProvences(resp);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCities = async () => {
    try {
      let resp = await getAllCitiesForSelection();
      await setCities(resp);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAreas = async () => {
    try {
      let resp = await getAllAreasForSelection();
      await setAreas(resp);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getSubAreas = async () => {
    try {
      let resp = await getAllSubAreasForSelection();
      await setSubAreas(resp);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fillSlideObject = async (data) => {
    try {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...data, // Overwrite with new data from the API
      }));

      setPreviewImage(data.image);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchSlide = async () => {
      await getProvences();
      await getCities();
      await getAreas();
      await getSubAreas();
    };
    fetchSlide();
  }, []); // Runs when `id` changes

  useEffect(() => {
    const fetchSlide = async () => {
      try {
        if (id) {
          const resp = await findSlideById(id);
          await fillSlideObject(resp.result);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSlide();
  }, [id]); // Runs when `id` changes

  useEffect(() => {

  }, [formData]); // Runs whenever formData changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e, values, r) => {
    console.log(values);
  };

  const handleSubmit = async () => {
    // axios.post("http://localhost:3500/api/slides/create", formData);
    createSlide(formData);
  };

  const handleImageChange = (e) => {
    try {
      if (e.target.files?.[0]) {
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
        setPreviewImage(e.target.files[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageUpload = async (e) => {
    // e.preventDefault();
    try {
      if (!e.target.files?.[0]) {
        console.log("Please select a file...");
      }

      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setPreviewImage(e.target.files[0]);

      const fileFormData = new FormData();
      fileFormData.append("image", e.target.files[0]);

      const result = await axios.post("http://localhost:3500/api/slide/upload", fileFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.data) {
        setFormData({ ...formData, image: result.data.file });
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleChangeSelect = async (event, values, controlName) => {
    setFormData({ ...formData, [`${controlName}`]: values.label });
    console.log(controlName);
  };


  const handleSupplierChange = async (event, values, controlName) => {
    setFormData({ ...formData, [`${controlName}`]: values.label });
    console.log(formData);
  };

  const handleProvenceChange = async (event, values) => {
    setFormData({ ...formData, provence: values.label });
  };

  const handleCityChange = async (event, values) => {
    setFormData({ ...formData, city: values.label });
  };


  const handleAreaChange = async (event, values) => {
    setFormData({ ...formData, area: values.label });
  };

  const handleSubAreaChange = async (event, values) => {
    setFormData({ ...formData, subArea: values.label });
  };

  const handleLightsChange = async (event, values) => {
    setFormData({ ...formData, lights: values.label });
  };

  const handleCategoryChange = async (event, values) => {
    setFormData({ ...formData, category: values.label });
  };


  return (
    <>
      <div style={{ margin: "2em", textAlign: "center" }}>{/* <h1>Slide Management</h1> */}</div>

      <div
        style={{
          margin: "0 1%",
          display: "grid",
          gridTemplateColumns: "60% 40%",
          // border: "1px solid #000",
          padding: "0.5em",
        }}
      >
        <SlideDetail
          formData={formData}
          suppliers={suppliers}
          provences={provences}
          cities={cities}
          areas={areas}
          subAreas={subAreas}
          lights={lights}
          category={category}
          mediaTypes={mediaTypes}
          dimension={dimension}
          status={status}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSupplierChange={handleSupplierChange}
          handleProvenceChange={handleProvenceChange}
          handleCityChange={handleCityChange}
          handleAreaChange={handleAreaChange}
          handleSubAreaChange={handleSubAreaChange}
          handleLightsChange={handleLightsChange}
          handleCategoryChange={handleCategoryChange}
          handleChangeSelect={handleChangeSelect}
        />
        <ImageCard previewImage={formData.image} handleImageUpload={handleImageUpload} />
      </div>
    </>
  );
};

export default CreateSlide;
