import { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Grid } from "@mui/material";
import Select from "../../../../components/form-controls/select/Select";

import InputField from "../../../../components/form-controls/input/textfield";
import CustomButton from "../../../../components/form-controls/buttons/customButton";
import DigitalSlide from "../../../../features/slides/degital.slide.component";
import { suppliers } from "../../../../constant/data";
// import { suppliers} from "../../../../constant/data";


const SlideDetail = function ({
  formData,
  handleChange,
  handleSubmit,
  provences,
  cities,
  areas,
  subAreas,
  handleSupplierChange,
  handleProvenceChange,
  handleCityChange,
  handleAreaChange,
  handleSubAreaChange,
}) {
  useEffect(() => {
    // console.log("FormData Updated chiled", formData);
  }, [formData]);

  const [lights, setLights] = useState([
    {
      value: "Available",
      label: "Available",
    },
    {
      value: "Not Available",
      label: "Not Available",
    },
  ]);

  const [category, setCategory] = useState([
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A",
      label: "A",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "B",
      label: "B",
    },
    {
      value: "C+",
      label: "C+",
    },
    {
      value: "C",
      label: "C",
    },
    {
      value: "D+",
      label: "D+",
    },
    {
      value: "D",
      label: "D",
    },
  ]);

  if(!provences && !cities && !areas || !subAreas) {
      return(
        <>
           <h1>Loading Data</h1>
        </>
      )
  }
 
  return (
    <>
      <Card style={{ marginRight: "1em" }}>
        {/* <CardHeader title="Blog Title" subheader="Blog Subtitle" /> */}
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputField
                width={"100%"}
                id="code"
                name="code"
                value={formData.code}
                defaultValue={formData.code}
                placeholder="Code: xx-xx-xx-xx"
                required={true}
                label="Enter Code"
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                id="supplier"
                name="supplier"
                value={formData.supplier}
                defaultValue={formData.supplier}
                // onChange={(event, values) => {
                //   setFormData({ ...formData, supplier: values.label });
                // }}
                onChange={handleSupplierChange}
                options={suppliers}
                label={"Supplier"}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                name="province"
                value={formData.province}
                // onChange={(event, values) => {
                //   setFormData({ ...formData, provence: values.label });
                // }}
                // onChange={(event, values) => {
                //   onProvenceChangeEvent(event, values);
                // }}
                onChange={handleProvenceChange}
                options={provences}
                label={"Province "}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                name="city"
                value={formData.city}
                defaultValue={formData.city}
                onChange={handleCityChange}
                options={cities}
                label={"City "}
                width={"100%"}
                
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                name="area"
                value={formData.area}
                defaultValue={formData.area}
                handleAreaChange={handleAreaChange}
                options={areas}
                label={"Area "}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                name="subArea"
                value={formData.subArea}
                defaultValue={formData.subArea}
                handleSubAreaChange ={handleSubAreaChange}
                options={subAreas}
                label={"Sub Area "}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                id="trafic_facing_coming"
                name="trafic_facing_coming"
                value={formData.trafic_facing_coming}
                defaultValue={formData.trafic_facing_coming}
                placeholder="Trafic comming from"
                required={true}
                label="FTCF - Facing Trafic Comming From"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <InputField
                id="facing_trafic_going"
                name="facing_trafic_going"
                value={formData.facing_trafic_going}
                defaultValue={formData.facing_trafic_going}
                placeholder="TGT -  Trafic Going To"
                required={true}
                label="TGT - Trafic Going To"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                name="mediaType"
                value={formData.mediaType}
                onChange={(event, values) => {
                  setFormData({ ...formData, mediaType: values.label });
                }}
                options={[
                  {
                    value: "Static",
                    label: "Static",
                  },
                  {
                    value: "Digital",
                    label: "Digital",
                  },
                ]}
                label={"Media Type "}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                name="category"
                value={formData.category}
                onChange={(event, values) => {
                  setFormData({ ...formData, category: values.label });
                }}
                options={category}
                label={"Category "}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={3}>
              <InputField
                id="height_feets"
                name="height_feets"
                value={formData.height_feets}
                defaultValue={formData.height_feets}
                placeholder="Enter Height"
                required={true}
                label="Height in feets"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={3}>
              <InputField
                id="width_feets"
                name="width_feets"
                value={formData.width_feets}
                defaultValue={formData.width_feets}
                placeholder="Enter width"
                required={true}
                label="Width in feets"
                width={175}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            {formData.mediaType === "Digital" && <DigitalSlide handleChange={handleChange} formData={formData} />}{" "}
            <Grid item xs={4}>
              <Select
                name="dimension"
                value={formData.dimension}
                onChange={(event, values) => {
                  setFormData({ ...formData, dimension: values.label });
                }}
                options={[
                  {
                    value: "Vertical",
                    label: "Vertical",
                  },
                  {
                    value: "Horizontal",
                    label: "Horizontal",
                  },
                ]}
                label={"Dimension "}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                name="lights"
                value={formData.lights}
                onChange={(event, values) => {
                  setFormData({ ...formData, lights: values.label });
                }}
                options={lights}
                label={"Lights "}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                name="status"
                value={formData.status}
                onChange={(event, values) => {
                  setFormData({ ...formData, status: values.label });
                }}
                options={[
                  {
                    value: "Available",
                    label: "Available",
                  },
                  {
                    value: "Not Available",
                    label: "Not Available",
                  },
                ]}
                label={"Status "}
                width={"100%"}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="supQuotedPrice"
                name="supQuotedPrice"
                value={formData.supQuotedPrice}
                defaultValue={formData.supQuotedPrice}
                placeholder="Supplier quoted price"
                required={true}
                label="Supplier Quoted Price"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="supDiscountedPrice"
                name="supDiscountedPrice"
                value={formData.supDiscountedPrice}
                defaultValue={formData.supDiscountedPrice}
                placeholder="Supplier discounted price"
                required={true}
                label="Supplier discounted Price"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="supFinalPrice"
                name="supFinalPrice"
                value={formData.supFinalPrice}
                defaultValue={formData.supFinalPrice}
                placeholder="Supplier final price"
                required={true}
                label="Supplier final pirce"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="quotedPrice"
                name="quotedPrice"
                value={formData.quotedPrice}
                defaultValue={formData.quotedPrice}
                placeholder="Customer quoted price"
                required={true}
                label="Customer quoted Price"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="discountedPrice"
                name="discountedPrice"
                value={formData.discountedPrice}
                defaultValue={formData.discountedPrice}
                placeholder="Customer discounted price"
                required={true}
                label="Customer Discounted Price"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="finalPrice"
                name="finalPrice"
                value={formData.finalPrice}
                defaultValue={formData.finalPrice}
                placeholder="Customer final price"
                required={true}
                label="Customer Final Pirce"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="latitude"
                name="latitude"
                value={formData.latitude}
                defaultValue={formData.latitude}
                placeholder="Latitude"
                required={true}
                label="Geo Latitude"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="longitude"
                name="longitude"
                value={formData.longitude}
                defaultValue={formData.longitude}
                placeholder="Longitude"
                required={true}
                label="Geo Longitude"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <InputField
                id="eyeBall"
                name="eyeBall"
                value={formData.eyeBall}
                defaultValue={formData.eyeBall}
                placeholder="Eye Ball view"
                required={true}
                label="Eye Ball view"
                width={"100%"}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <CustomButton id="new" name="new" label="Create" />
          <CustomButton id="save" name="save" label="Save" handleClick={handleSubmit} />
        </CardActions>
      </Card>
    </>
  );
};

export default SlideDetail;
