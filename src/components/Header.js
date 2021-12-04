import React, {useContext, useState} from "react";
import secureStorage from "../store/secure-storage";
import signContext from "../store/sign-context";
import {
  alpha, AppBar, Box, Button, InputBase, Toolbar, styled, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography
} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";

function Header() {
  const signCtx = useContext(signContext);

  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleOpenMenu = (e) => setAnchorMenu(e.currentTarget);
  const handleCloseMenu = () => setAnchorMenu(null);

  const signOut = () => {
    secureStorage.clear();
    window.location.reload();
  }

  return (
    <AppBar position="static" color="success">
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
            <Button variant="contained" color="warning" sx={styles.button} onClick={signCtx.onSignIn}>
              đăng nhập
            </Button>

            <Button variant="contained" color="warning" sx={styles.button} onClick={signCtx.onSignUp}>
              đăng ký
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
              <MenuItem onClick={signOut}>
                <Typography textAlign="center">
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
    color: "#254000"
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
    color: "white",
    display: "block"
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
