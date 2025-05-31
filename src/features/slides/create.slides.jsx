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
import { createSlide, getSlideById, updateSlide } from "../../services/apis/slideService";

const CreateSlide = () => {
  const id = useSelector((state) => state.slide.slideId || null);
  const [sid, setSid] = useState(null);
  const [provences, setProvences] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [subAreas, setSubAreas] = useState([]);
  const [formData, setFormData] = useState(null); // Initially null
  const [image, setImage] =  useState(null);

  const emptyObject = {
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
    image: "",
  };

  const fetchSelections = async () => {
    try {
      const provencesResp = await getAllProvencsForSelection();
      const citiesResp = await getAllCitiesForSelection();
      const areasResp = await getAllAreasForSelection();
      const subAreasResp = await getAllSubAreasForSelection();
      setProvences(provencesResp);
      setCities(citiesResp);
      setAreas(areasResp);
      setSubAreas(subAreasResp);
    } catch (error) {
      console.error("Error fetching selection data:", error.message);
    }
  };

  const fillSlideObject = async (data) => {
    try {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...data, // Merge new data into current state
      }));
    } catch (error) {
      console.error("Error updating form data:", error.message);
    }
  };

  useEffect(() => {
    fetchSelections();
    setSid(id?.payload || null);
  }, [id]);

  useEffect(() => {
    const fetchSlide = async () => {
      try {
        if (sid) {
          const response = await getSlideById(sid);
          fillSlideObject(response.result || emptyObject);
        } else {
          setFormData(emptyObject); // Reset to empty when no ID
        }
      } catch (error) {
        console.error("Error fetching slide:", error.message);
      }
    };
    fetchSlide();
  }, [sid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!id) {
        await createSlide(formData);
      } else {
        await updateSlide(id, formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleRefresh = () => {
    setFormData({ ...emptyObject });
  };

  const handleImageUpload = async (e) => {
    try {
      // Check if a file is selected
      const file = e.target.files?.[0];
      if (!file) {
        console.log("Please select a file.");
        return;
      }
  
      // Validate file type (e.g., only allow images)
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        console.log("Please upload a valid image file (JPEG, PNG, GIF).");
        return;
      }
  
      // Prepare the file for upload
      const fileFormData = new FormData();
      fileFormData.append("image", file);
  
      // Make API request to upload the image
      const result = await axios.post(
        "http://localhost:3500/api/slide/upload",
        fileFormData,
        {
          headers: { "Content-Type": "multipart/form-data", "x-auth-token":"token" },
        }
      );
  
      // Check if the response contains the uploaded file data
      if (result.data?.file) {
        setFormData((prevData) => ({
          ...prevData,
          image: result.data.file,
        }));
      } else {
        console.error("Image upload failed. No file data in response.");
      }
    } catch (error) {
      // Log error message
      console.error("Error uploading image:", error?.response?.data?.message || error.message);
    }
  };
  

  const handleChangeSelect = (event, values, controlName) => {
    setFormData((prevData) => ({ ...prevData, [controlName]: values.label }));
  };

  return (
    <>
      <div style={{ margin: "2em", textAlign: "center" }}>
        <h1>Slide Management</h1>
      </div>

      {formData ? (
        <div
          style={{
            margin: "0 1%",
            display: "grid",
            gridTemplateColumns: "60% 40%",
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
            handleRefresh={handleRefresh}
            handleChangeSelect={handleChangeSelect}
          />
          <ImageCard previewImage={formData.image} handleImageUpload={handleImageUpload} />
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>Loading form data...</p>
        </div>
      )}
    </>
  );
};

export default CreateSlide;
