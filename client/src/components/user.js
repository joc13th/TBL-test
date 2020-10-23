import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

export default function User() {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    axios
      .get(`http://localhost:3000/contacts/${user?.id}`)
      .then((res) => (res.data !== "error" ? setData(res.data) : null));
  }, [user.id]);

  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:3000/remove/${user.id}/${id}`)
      .then((res) => setData(data.filter((us) => us.id !== res.data.id)));
  };

  const columns = [
    { title: "First name", field: "first_name" },
    { title: "Last name", field: "last_name" },
    { title: "Number", field: "contact_number" },
    { title: "Email", field: "email" },
  ];
  return (
    <div className="principalContacts">
      <div className="myContacts">
        {data.length >= 1 ? (
          <MaterialTable
            style={{ width: "80%", marginTop: "3vw", zIndex: "5" }}
            title="My contacts"
            columns={columns}
            data={data}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setData([...dataDelete]);
                    deleteContact(oldData.id);
                    resolve();
                  }, 1000);
                }),
            }}
          />
        ) : (
          <span
            style={{
              color: "white",
              marginBottom: "16vw",
              marginTop: "4vw",
              fontSize: "7vw",
            }}
          >
            You don't have contacts yet
          </span>
        )}
      </div>
    </div>
  );
}
