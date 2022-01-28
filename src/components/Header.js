import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "../stores/axios";
import secureStorage from "../stores/secure-storage";
import signContext from "../stores/sign-context";
import {
  alpha, AppBar, Box, Button, InputBase, Toolbar, styled, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography,
  Divider, Fade
} from "@mui/material";
import {
  LocalLibrary as LocalLibraryIcon, Login as LoginIcon, Logout as LogoutIcon, ManageAccounts as ManageAccountsIcon,
  Search as SearchIcon
} from "@mui/icons-material";
import logoWhite from "../assets/logo/logo-white.png";

function Header() {
  const history = useHistory();
  const signCtx = useContext(signContext);

  const [avatar, setAvatar] = useState("");
  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleOpenMenu = (e) => setAnchorMenu(e.currentTarget);
  const handleCloseMenu = () => setAnchorMenu(null);

  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = () => {
    axios
      .get("/users/personal")
      .then((res) => {
        setAvatar(res.data.user.avatar);
      });
  }

  const toPersonal = () => {
    history.push("/personal");
    handleCloseMenu();
  }

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
    <AppBar position="sticky" style={{backgroundColor: "#7cb305"}}>
      <Toolbar>
        <Box display="flex" flexGrow={1} alignItems="center">
          <Box>
            <Link to="/">
              <img src={logoWhite} alt="logo" height={50}/>
            </Link>
          </Box>

          <Box ml={5}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase placeholder="Tìm kiếm..." inputProps={{"aria-label": "search"}}/>
            </Search>
          </Box>
        </Box>

        {!secureStorage.getItem("token") ? (
          <Box display="flex" flexGrow={0}>
            <Button variant="contained" color="warning" sx={styles.button} onClick={signCtx.onSignUp}>
              đăng ký
            </Button>

            <Button startIcon={<LoginIcon/>} variant="outlined" color="warning" sx={styles.button} onClick={signCtx.onSignIn}>
              đăng nhập
            </Button>
          </Box>
        ) : (
          <Box display="flex" flexGrow={0}>
            <Tooltip title="Mở tùy chọn">
              <IconButton onClick={handleOpenMenu}>
                <Avatar src={avatar}/>
              </IconButton>
            </Tooltip>

            <Menu open={!!anchorMenu} onClose={handleCloseMenu} anchorEl={anchorMenu} TransitionComponent={Fade}>
              {secureStorage.getItem("role") === "admin" && (
                <MenuItem onClick={toSetEdit}>
                  <Typography fontSize={18}>
                    Chỉnh sửa học phần
                  </Typography>
                </MenuItem>
              )}

              {secureStorage.getItem("role") === "student" && (
                <>
                  <MenuItem onClick={toPersonal}>
                    <ManageAccountsIcon/>
                    <Typography fontSize={18} ml={1}>
                      Thông tin cá nhân
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={toSystemSets}>
                    <LocalLibraryIcon/>
                    <Typography fontSize={18} ml={1} mt={1}>
                      Chương trình học
                    </Typography>
                  </MenuItem>
                </>
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
