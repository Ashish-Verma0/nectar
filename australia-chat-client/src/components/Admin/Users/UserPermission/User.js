import React,{useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./UserPermission.module.css";
import axios from "axios";
import DeleteDialog from "./DeleteDialog";

const User = ({
  user,
  setOpenSnackbar,
  setMessage,
  setSeverity,
  fetchUsers,
  index,
}) => {
  const [deleteClicked, setDeleteClicked] = useState(false);

    const deleteHandler = async () => {
        setDeleteClicked(!deleteClicked)
      try {
        const res = await axios.delete(
          `/api/v1/admin/deleteAdminUser/${user._id}`
        );
        fetchUsers();
        setOpenSnackbar(true);
        setMessage(res.data.message);
        setSeverity("success");
      } catch (error) {
        setOpenSnackbar(true);
        setMessage(error.response.data.message);
        setSeverity("error");
      }
    };
  return (
    <div
      className="row py-2"
      style={
        index % 2 === 0
          ? { backgroundColor: "#FAFAFC" }
          : { backgroundColor: "#FFFFFF" }
      }
    >
      {deleteClicked && <DeleteDialog deleteHandler={deleteHandler} deleteClicked={deleteClicked} setDeleteClicked={setDeleteClicked}/>}
      <div className="col-4" style={{ font: "Montserrat", color: "#6E6B7B" }}>
        <img src={user.avatar} alt="" className="me-2" />
        {user.name}
      </div>
      <div
        className={`col-4 ${styles.gmail}`}
        style={{ font: "Montserrat", color: "#6E6B7B" }}
      >
        {user.email}
      </div>
      <div
        className={`col-2 ${styles.gmail}`}
        style={{ font: "Montserrat", color: "#6E6B7B" }}
      >
        {user.designation}
      </div>
      <div
        className={`col-2 p-0 align-self-center  d-flex justify-content-evenly`}
        // style={{
        //   color: "#ff5858",
        //   backgroundColor: "#ffd4d4",
        //   borderRadius: "50px",
        //   cursor: "pointer",
        // }}
      >
        {/* Delete User */}
        <DeleteIcon onClick={()=>setDeleteClicked(!deleteClicked)} />
      </div>
    </div>
  );
};

export default User;
