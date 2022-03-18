import React from "react";
import {Card, Typography} from "@mui/material";

function SystemSetWelcome() {
  return (
    <Card elevation={6}>
      <Typography fontSize={27} textAlign="center" fontWeight="bold" mt={1} mb={3}>
        Giới thiệu về chương trình học
      </Typography>

      <Typography fontSize={20} mx={1} mb={1}>
        <br/>
        Đối với người bắt đầu học, chọn chương trình học Căn bản, có 3 loại kiến thức cần nắm:
        <br/>
        &emsp;- Hiragana: Bảng chữ cái tượng thanh căn bản.
        <br/>
        &emsp;- Katakana: Bảng chữ cái tượng thanh căn bản.
        <br/>
        &emsp;- Bộ thủ Hán tự: Đơn vị cấu thành nên Hán tự, làm tiền đề cho việc học Hán tự sau này.
        <br/><br/>
        Đối với người đang học cấp độ N5 - N1:
        <br/>
        &emsp;- Hán tự: Chữ cái tượng hình, ở đây bạn sẽ học được cách viết và âm Hán Việt của Hán tự.
        <br/>
        &emsp;- Từ vựng: Đơn vị cấu thành nên câu.
        <br/>
        &emsp;- Ngữ pháp: Các cấu trúc ngữ pháp căn bản.
      </Typography>
    </Card>
  );
}

export default SystemSetWelcome;
