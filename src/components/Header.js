import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import secureStorage from "../stores/secure-storage";
import signContext from "../stores/sign-context";
import {
  alpha, AppBar, Box, Button, InputBase, Toolbar, styled, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography,
  Divider
} from "@mui/material";
import {Login as LoginIcon, Logout as LogoutIcon, Search as SearchIcon} from "@mui/icons-material";

function Header() {
  const history = useHistory();
  const signCtx = useContext(signContext);

  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleOpenMenu = (e) => setAnchorMenu(e.currentTarget);
  const handleCloseMenu = () => setAnchorMenu(null);

  const toSetEdit = () => {
    history.push("/admin/sets/welcome");
    handleCloseMenu();
  }

  const toSystemSets = () => {
    history.push("/student/sets/welcome");
    handleCloseMenu();
  }

  const signOut = () => {
    secureStorage.clear();
    window.location.reload();
  }

  return (
    <AppBar position="sticky" color="success" sx={styles.header}>
      <Toolbar>
        <Box sx={styles.boxLeft}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase placeholder="Tìm kiếm..." inputProps={{"aria-label": "search"}}/>
          </Search>
        </Box>

        {!secureStorage.getItem("token") ? (
          <Box sx={styles.boxRight}>
            <Button variant="contained" color="warning" sx={styles.button} onClick={signCtx.onSignUp}>
              đăng ký
            </Button>

            <Button startIcon={<LoginIcon/>} variant="outlined" color="warning" sx={styles.button} onClick={signCtx.onSignIn}>
              đăng nhập
            </Button>
          </Box>
        ) : (
          <Box sx={styles.boxRight}>
            <Tooltip title="Mở tùy chọn">
              <IconButton onClick={handleOpenMenu}>
                <Avatar>
                  {secureStorage.getItem("username")[0]}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu open={!!anchorMenu} onClose={handleCloseMenu} anchorEl={anchorMenu}>
              {secureStorage.getItem("role") === "admin" && (
                <MenuItem onClick={toSetEdit}>
                  <Typography fontSize={18}>
                    Chỉnh sửa học phần
                  </Typography>
                </MenuItem>
              )}

              {secureStorage.getItem("role") === "student" && (
                <MenuItem onClick={toSystemSets}>
                  <Typography fontSize={18}>
                    Chương trình học
                  </Typography>
                </MenuItem>
              )}

              <Divider/>

              <MenuItem onClick={signOut}>
                <LogoutIcon color="error"/>
                <Typography color="red" fontSize={18} ml={1}>
                  Đăng xuất
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

const styles = {
  header: {
  },
  boxLeft: {
    flexGrow: 1,
    display: "flex"
  },
  boxRight: {
    flexGrow: 0,
    display: "flex"
  },
  button: {
    mx: 1,
    my: 2,
    color: "white"
  }
}

const Search = styled("div")(({theme}) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));
