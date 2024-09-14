import { useState, useEffect } from "react";
import axios from "axios";
import Select from "../../components/form-controls/select/Select";
import InputField from "../../components/form-controls/input/textfield";
import CustomButton from "../../components/form-controls/buttons/customButton";
import { provinces, cities, areas, subAreas, suppliers } from "../../constant/data";
import { Card, CardContent, CardActions, Typography, Grid } from "@mui/material";

const CreateParty = () => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    provence: "",
    city: "",
    phoneNo: "",
    cellNo: "",
    email: "",
    website: "",
    fax: "",
    contactPerson: "",
    contactPersonEmail: "",
    address: "",
    NTN: "",
    GST: "",
    bankName: "",
    gl_code: "",
    remarks_internal: "",
    is_active: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async () => {
    console.log(formData);
    axios.post("http://localhost:3500/api/party/create", formData);
  };

  return (
    <>
      <div
        style={{
          margin: "0 1%",
          display: "grid",
          gridTemplateColumns: "60%",
          // border: "1px solid #000",
          padding: "0.5em",
        }}
      >
        <Card style={{ marginRight: "1em" }}>
          {/* <CardHeader title="Blog Title" subheader="Blog Subtitle" /> */}
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField id="name" name="name" defaultValue={formData.name} placeholder="Party name" required={true} label="Party Name" width={"100%"} onChange={(e) => handleChange(e)} />
              </Grid>
              <Grid item xs={6}>
                <Select
                  name="provence"
                  value={formData.province}
                  onChange={(event, values) => {
                    setFormData({ ...formData, provence: values.label });
                  }}
                  options={provinces}
                  label={"Provence "}
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={6}>
                <Select
                  name="city"
                  value={formData.city}
                  onChange={(event, values) => {
                    setFormData({ ...formData, city: values.label });
                  }}
                  options={cities}
                  label={"City "}
                  width={"100%"}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="phoneNo"
                  name="phoneNo"
                  defaultValue={formData.phoneNo}
                  placeholder="Part Contact Number"
                  required={true}
                  label="Part Contact number"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="cellNo"
                  name="cellNo"
                  defaultValue={formData.cellNo}
                  placeholder="Party cell number"
                  required={true}
                  label="Party cell number"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="email"
                  name="email"
                  defaultValue={formData.email}
                  placeholder="Party email"
                  required={true}
                  label="Party email address"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="website"
                  name="websit"
                  defaultValue={formData.website}
                  placeholder="Web Address"
                  required={true}
                  label="Party Address"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={6}>
                <InputField id="fax" name="fax" defaultValue={formData.fax} placeholder="Fax Number" required={true} label="Fax Number" width={"100%"} onChange={(e) => handleChange(e)} />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="contactPerson"
                  name="contactPerson"
                  defaultValue={formData.contactPerson}
                  placeholder="Contact person"
                  required={true}
                  label="Contact Person"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              {formData.mediaType === "Digital" && <DigitalSlide handleChange={handleChange} formData={formData} />}{" "}
              <Grid item xs={6}>
                <InputField
                  id="contactPersonEmail"
                  name="contactPersonEmail"
                  defaultValue={formData.contactPersonEmail}
                  placeholder="Contact person email address"
                  required={true}
                  label="Contact Person Email"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
             
              <Grid item xs={6}>
                <InputField id="NTN" name="NTN" defaultValue={formData.NTN} placeholder="National tax number" required={true} label="Tax Number" width={"100%"} onChange={(e) => handleChange(e)} />
              </Grid>
              <Grid item xs={6}>
                <InputField id="GST" name="GST" defaultValue={formData.GST} placeholder="Sales Tax Number" required={true} label="Sales Tax Number" width={"100%"} onChange={(e) => handleChange(e)} />
              </Grid>
              <Grid item xs={6}>
                <InputField id="bankName" name="bankName" defaultValue={formData.bankName} placeholder="Bank Name" required={true} label="Bank Name" width={"100%"} onChange={(e) => handleChange(e)} />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  id="gl_code"
                  name="gl_code"
                  defaultValue={formData.gl_code}
                  placeholder="Internal Ledger Code"
                  required={true}
                  label="GL Code Internal"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="address"
                  name="address"
                  defaultValue={formData.address}
                  placeholder="Party detailed address"
                  required={true}
                  label="Party Address"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  id="remarks_internal"
                  name="remarks_internal"
                  defaultValue={formData.remarks_internal}
                  placeholder="Internal Remarks"
                  required={true}
                  label="Remarks Internal"
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
      </div>
    </>
  );
};

export default CreateParty;
