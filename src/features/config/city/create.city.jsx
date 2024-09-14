import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import InputField from "../../../components/form-controls/input/textfield";
import CheckboxField from "../../../components/form-controls/input/checkbox"
import Row from "../../../components/layout/row";
import CustomButton from "../../../components/form-controls/buttons/customButton";
import { Card, CardContent, CardActions, Typography } from "@mui/material";


import "./create.city.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCity = () => {
//   const currentUser = useSelector((state) =>
//     state.user.currentUser ? state.user.currentUser : null
//   );
  const urlString = "http://localhost:3000"; //currentUser?.company_url ? currentUser.company_url : "secondbody";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    is_active: false,
  });

  const [_id, setId] = useState(null);
  const id = new URLSearchParams("search").get("id");
  let token = "abc"; //localStorage.getItem('token');

  useEffect(() => {
    setId(id);
    if (!id || id === "") return;
    console.log("City....", id);

    (async () => {
      let resp = await axios.get(`/city/find/${id}`, {
        headers: {
          "x-auth-token": `${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      let data = await resp.data.result;
      setFormData({
        ...formData,
        id: data.id,
        name: data.name,
        is_active: data.is_active,
      });
    })();
  }, [id]);

  useEffect(() => {
  }, [formData]);


  const refreshState = async () => {
    setFormData({ ...formData, name: "", is_active: false });
  };

  const notifyCreate = () => toast("Record Sucessfully Create...");
  const notifyUpdate = () => toast("Record Sucessfully Updated...");
  const notifyDelete = () => toast("Record Sucessfully Delete...");
  const notifyError = () => toast("Record Could not be Delete...");

  const handleSubmit = async () => {
    try {
      let url = "";
      if (id && id !== "") {
        url = "/city/update";
      } else {
        url = "/city/create";
      }

      let resp = await axios.post(url, city, {
        headers: {
          "x-auth-token": `${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      let data = await resp.data;

      if (id) {
        notifyUpdate();
      } else {
        notifyCreate();
      }

      await refreshState();
      navigate(`/${urlString}/city/list`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChecked = (e) => {
    setFormData({ ...formData, is_active: !formData.is_active });
    console.log(formData);
  };

  const handleDelete = async () => {
    try {
      let resp = await axios.delete(`/city/delete/${id}`, {
        headers: {
          "x-auth-token": `${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      let data = await resp.data;
      notifyDelete();
      await refreshState();
      navigate(`/${urlString}/company/list`);
    } catch (error) {
      notifyError();
    }
  };

  return (
    <>
      <div style={{ margin: "2em", textAlign: "center" }}>
        {/* <h1>Slide Management</h1> */}
      </div>

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
            <Typography variant="body2" color="text.secondary">
              <Row>
                <InputField
                  id="name"
                  name="name"
                  defaultValue={formData.latitude}
                  placeholder="Name"
                  required={true}
                  label="City Name"
                  width={400}
                  onChange={(e) => handleChange(e)}
                />
              </Row>
              <Row>
                <CheckboxField
                  id="is_active"
                  name="is_active"
                  required={true}
                  label="Active"
                  width={300}
                  checked={formData.is_active}
                  onChange={(e) => handleChecked(e)}
                />
              </Row>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <CustomButton id="new" name="new" label="Create" />
            <CustomButton
              id="save"
              name="save"
              label="Save"
              handleClick={handleSubmit}
            />
            <CustomButton
              id="List"
              name="List"
              label="List"
            />
          </CardActions>
        </Card>
      </div>
    </>
  );
};
export default CreateCity;
