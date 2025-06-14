import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SlideDetail from "../slides/components/cards/slideDetail.component";
import ImageCard from "../slides/components/cards/imageCard.component";
import { getAllProvencsForSelection } from "../../services/apis/config/provService";
import { getAllCitiesForSelection } from "../../services/apis/config/cityService";
import { getAllAreasForSelection } from "../../services/apis/config/areaService";
import { getAllSubAreasForSelection } from "../../services/apis/config/subAreaService";
import { suppliers, lights, category, mediaTypes, dimension, status } from "../../constant/data";
import axios from "axios";
import { createSlide, getSlideById, updateSlide } from "../../services/apis/slideService";
import CustomButton from "../../components/form-controls/buttons/customButton";
import { showToastNotification } from "../../helpers/notificationsHepler";

const CreateSlide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.slide.slideId || null);
  const [provences, setProvences] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [subAreas, setSubAreas] = useState([]);
  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      console.log('Fetching selection data...');
      const provencesResp = await getAllProvencsForSelection();
      const citiesResp = await getAllCitiesForSelection();
      const areasResp = await getAllAreasForSelection();
      const subAreasResp = await getAllSubAreasForSelection();
      
      console.log('Selection data received:', {
        provences: provencesResp,
        cities: citiesResp,
        areas: areasResp,
        subAreas: subAreasResp
      });

      setProvences(provencesResp);
      setCities(citiesResp);
      setAreas(areasResp);
      setSubAreas(subAreasResp);

    } catch (error) {
      console.error("Error fetching selection data:", error.message);
      showToastNotification("error", "Failed to load selection data");
    }
  };

  const fillSlideObject = async (data) => {
    try {
      console.log('Filling slide object with data:', data);
      setFormData((prevFormData) => {
        const newData = {
          ...prevFormData,
          ...data,
        };
        console.log('New form data:', newData);
        return newData;
      });
    } catch (error) {
      console.error("Error updating form data:", error.message);
      showToastNotification("error", "Failed to load slide data");
    }
  };

  useEffect(() => {
    console.log('Initial effect - Redux ID:', id);
    fetchSelections();
  }, []);

  useEffect(() => {
    const fetchSlide = async () => {
      setIsLoading(true);
      try {

        let slideId = id?.payload;
        // console.log('Fetching slide with Redux ID:', slideId);

        if (slideId) {
          const slideData = await getSlideById(slideId);
          console.log('Fetching slide with Redux ID:', slideData);
      
          if (slideData) {
            fillSlideObject(slideData);
          } else {
            console.warn('No result data in response:', slideData);
            fillSlideObject(emptyObject);
          }
        } else {
          console.log('No slide ID in Redux, setting empty form');
          setFormData(emptyObject);
        }
      } catch (error) {
        console.error("Error fetching slide:", error.message);
        showToastNotification("error", "Failed to fetch slide details");
        setFormData(emptyObject);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlide();
  }, [id]);

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    console.log('Form field changed:', e.target.name, 'New value:', e.target.value);
    setFormData(newData);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log('Submitting form data:', formData);
      if (!id?.payload) {
        const response = await createSlide(formData);
        console.log('Create slide response:', response);
        showToastNotification("success", "Slide created successfully");
      } else {
        const response = await updateSlide(id.payload, formData);
        console.log('Update slide response:', response);
        showToastNotification("success", "Slide updated successfully");
      }
      navigate('/slides/list');
    } catch (error) {
      console.error("Error submitting form:", error.message);
      showToastNotification("error", "Failed to save slide");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing form data');
    setFormData({ ...emptyObject });
    showToastNotification("info", "Form reset to empty state");
  };

  const handleBack = () => {
    navigate('/slides/list');
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files?.[0];
      if (!file) {
        showToastNotification("warning", "Please select a file");
        return;
      }
  
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        showToastNotification("error", "Please upload a valid image file (JPEG, PNG, GIF)");
        return;
      }
  
      const fileFormData = new FormData();
      fileFormData.append("image", file);
  
      console.log('Uploading image...');
      const result = await axios.post(
        "http://localhost:3500/api/slides/upload",
        fileFormData,
        {
          headers: { "Content-Type": "multipart/form-data", "x-auth-token":"token" },
        }
      );
  
      console.log('Image upload response:', result.data);
      if (result.data?.file) {
        setFormData((prevData) => ({
          ...prevData,
          image: result.data.file,
        }));
        showToastNotification("success", "Image uploaded successfully");
      } else {
        showToastNotification("error", "Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error?.response?.data?.message || error.message);
      showToastNotification("error", "Failed to upload image");
    }
  };

  const handleChangeSelect = (event, values, controlName) => {
    console.log('Select changed:', controlName, 'New value:', values);
    setFormData((prevData) => ({ ...prevData, [controlName]: values.label }));
  };

  return (
    <>
      <div style={{ margin: "1em", textAlign: "center" }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          {id?.payload ? 'Edit Slide' : 'Create New Slide'}
        </h1>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>Loading...</p>
        </div>
      ) : formData ? (
        <div
          style={{
            margin: "0 1%",
            display: "grid",
            gridTemplateColumns: "60% 40%",
            padding: "0.5em",
            gap: "1rem"
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <CustomButton 
                id="back" 
                name="back" 
                label="Back to List" 
                handleClick={handleBack} 
              />
            </div>
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
          </div>
          <ImageCard previewImage={formData.image} handleImageUpload={handleImageUpload} />
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>No data available</p>
        </div>
      )}
    </>
  );
};

export default CreateSlide;
