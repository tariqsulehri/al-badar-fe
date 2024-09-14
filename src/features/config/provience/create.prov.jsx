import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setProv, setId } from "../../../features/config/provience/slice/provSlice";
import InputField from "../../../components/form-controls/input/textfield";
import CustomButton from "../../../components/form-controls/buttons/customButton";
import { Card, CardContent, CardActions, Typography, Grid } from "@mui/material";
import CheckboxField from "../../../components/form-controls/input/checkbox";
import { createProv, updateProv, findProvById } from "../../../services/apis/config/provService";

const CreateProv = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.prov.id || null);
  console.log("id", id);

  const [formData, setFormData] = useState({
    name: "",
    is_active: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const resp = await findProvById(id);
          setFormData({
            name: resp.name,
            is_active: resp.is_active,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [id]);

  function refreshForm() {
    dispatch(setId(null));
    setFormData({
      name: "",
      is_active: false,
    });
  }

  const handleSubmit = async () => {
    try {

      let resp = null;
      if (id) {
        await updateProv(id,formData);
      } else {
        await createProv(formData);
      }
     
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (id) {
        await axios.get(`http://localhost:3500/api/provence/delete/${id}`);
        refreshForm();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChecked = (e) => {
    setFormData({ ...formData, is_active: !formData.is_active });
  };

  return (
    <>
      <div
        style={{
          margin: "0 1%",
          display: "grid",
          gridTemplateColumns: "40%",
          padding: "0.5em",
        }}
      >
        <Card style={{ marginRight: "1em" }}>
          {/* <CardHeader title="Blog Title" subheader="Blog Subtitle" /> */}
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputField
                  id="name"
                  name="name"
                  value={formData.name}
                  defaultValue={formData.name}
                  placeholder="Provence Name"
                  required={true}
                  label="Provence Name"
                  width={"100%"}
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <CheckboxField id="is_active" name="is_active" required={true} label="Active" width={300} checked={formData.is_active} onChange={(e) => handleChecked(e)} />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <CustomButton id="save" name="save" label={id ? "Update" : "Create"} handleClick={handleSubmit} />
            <CustomButton id="delete" name="delete" label="Delete" handleClick={handleDelete} />
            <CustomButton
              id="list"
              name="list"
              label="list"
              handleClick={() => {
                navigate(`/setup/prov/list`);
              }}
            />
          </CardActions>
        </Card>
      </div>
    </>
  );
};
export default CreateProv;
