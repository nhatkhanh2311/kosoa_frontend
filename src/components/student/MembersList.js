import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../../stores/axios";
import snackbarContext from "../../stores/snackbar-context";
import {Avatar, Box, Card, CardHeader, CircularProgress, Pagination, Typography} from "@mui/material";

function MembersList() {
  const {classId} = useParams();
  const sbCtx = useContext(snackbarContext);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .post(`/members/accepted`, {
        id: classId
      })
      .then((res) => {
        setMembers(res.data.members);
        setLoading(false);
      })
      .catch((err) => {
        sbCtx.onSnackbar("Đã có lỗi xảy ra!", "error");
      });
  }

  const handlePage = (e, value) => {
    setPage(value);
  }

  return (
    <Card elevation={6}>
      <Typography textAlign="center" fontSize={22} fontWeight="bold" my={2}>
        Thành viên
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="success"/>
        </Box>
      ) : (
        <>
          {members.slice((page - 1) * 10, page * 10).map((member) => (
            <CardHeader avatar={<Avatar src={member.avatar} component={Link}
                                        to={`/user/${member.userId}`} target="_blank"/>}
                        title={
                          <Typography sx={styles.title} component={Link} to={`/user/${member.userId}`} target="_blank">
                            {member.name}
                          </Typography>
                        }/>
          ))}

          <Box display="flex" justifyContent="center" my={1}>
            <Pagination color="success" size="small" shape="rounded"
                        count={Math.ceil(members.length / 10)} page={page} onChange={handlePage}/>
          </Box>
        </>
      )}
    </Card>
  );
}

export default MembersList;

const styles = {
  title: {
    fontWeight: "bold",
    textDecoration: "none"
  }
}
