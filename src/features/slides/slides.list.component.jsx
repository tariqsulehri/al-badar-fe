import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { CheckCircle, Cancel, Switch } from '@mui/icons-material';

const initialUsers = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
  { id: 4, name: 'David', active: true },
  { id: 5, name: 'Eve', active: false },
  { id: 6, name: 'Frank', active: true },
  { id: 7, name: 'Grace', active: false },
  { id: 8, name: 'Heidi', active: true },
  { id: 9, name: 'Ivan', active: false },
  { id: 10, name: 'Judy', active: true },
];

const App = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleStatusChange = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const columns = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "active",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return value ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          );
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRenderLite: (dataIndex) => {
          const user = users[dataIndex];
          return (
            <Switch
              checked={user.active}
              onChange={() => handleStatusChange(user.id)}
              color="primary"
            />
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
  };

  return (
    <div style={{ margin: 20 }}>
      <MUIDataTable
        title={"User Management"}
        data={users}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default App;