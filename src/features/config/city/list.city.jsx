import React, { Fragment, useState, useEffect } from "react";
import axios from "../../../services/axios";
import CustomButton from "../../../components/form-controls/buttons/customButton";
import { useNavigate } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import "./create.city.css";

import MUIDataTable from "mui-datatables";

const CityList = () => {
  const navigate = useNavigate();
  const [cityData, setCityData] = useState(null);
  let token = "token"; //localStorage.getItem('token');

  // const currentUser = useSelector(state => state.user.currentUser ? state.user.currentUser : null );

  let tData = [];

  let tableData = async (data) => {
    data.forEach((row) => {
      let rowData = [];
      rowData.push(row.id);
      rowData.push(row.name);
      rowData.push(row.is_activ);
      tData.push(rowData);
    });

    return tData;
  };

  useEffect(() => {
    (async () => {
      let resp = await axios.get(`/city/list`, {
        headers: {
          "x-auth-token": `${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      });
      setCityData(resp.data);
      tableData(cityData);
    })();
  }, []);

  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        filter: true,
        sort: false,
      },
    },

    {
      name: "name",
      label: "City Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "is_active",
      label: "Active",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const deleteRow = (idsToDelete) => {
    console.log("ids to delete", idsToDelete); // your delete request here
    console.log(cityData[0]);
  };

  const handleRowclick = (rowData, rowMeta) => {
    console.log("----RowClick");
    console.log("rowData: ", rowData[0]);
    navigate(`/setup/city/create?id=${rowData[0]}`);
  };

  const handleRowSelect = (curRowSelected, allRowsSelected) => {
    console.log("---RowSelect");
    console.log("Row Selected: ", curRowSelected);
    console.log("All Selected: ", allRowsSelected);
  };

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false,
    onRowClick: handleRowclick,
    onRowsDelete: deleteRow,
    onRowSelect: handleRowSelect,
    customBodyRender: (value, tableMeta, updateValue) => (
      <button> Edit </button>
    ),
    // onRowsDelete: async (rowsDeleted) => {
    //     const idsToDelete = rowsDeleted.data.map(d => CityData[d.dataIndex].id); // array of all ids to to be deleted
    //     await deleteRow(idsToDelete);
    // },
  };

  if (cityData && cityData.length > 0) {
    return (
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
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <MUIDataTable
                title={"Cities Data"}
                data={cityData}
                columns={columns}
                options={options}
              />
            </Typography>
          </CardContent>
          
          <CardActions disableSpacing>
            <CustomButton
              id="create"
              name="create"
              label="Add"
              handleClick={() => {
                navigate(`/setup/city/create`);
              }}
            />
          </CardActions>
        </Card>
      </div>
    );
  } else {
    return <div>Cities List</div>;
  }
};

export default CityList;
