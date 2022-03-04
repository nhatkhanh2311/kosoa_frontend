import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "../stores/axios";
import snackbarContext from "../stores/snackbar-context";

function UserClasses() {
  const {userId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [role, setRole] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getClasses();
  }, []);

  const getClasses = () => {
    setLoading(true);
    axios
      .post("/users/show", {
        id: parseInt(userId)
      })
      .then((res) => {
        setRole(res.data.user.role);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  return (
    <div/>
  );
}

export default UserClasses;
