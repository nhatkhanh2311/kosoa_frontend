import React from "react";
import {Card, Typography} from "@mui/material";

function SetEditWelcome() {
  return (
    <Card elevation={6}>
      <Typography fontSize={27} textAlign="center" fontWeight="bold" mt={1} mb={3}>
        Trang chỉnh sửa học phần
      </Typography>

      <Typography fontSize={20} textAlign="center" mx={1} mb={1}>
        Vui lòng chọn học phần nằm trong cấp độ tương ứng phía bên trái để bắt đầu chỉnh sửa
      </Typography>
    </Card>
  );
}

export default SetEditWelcome;
