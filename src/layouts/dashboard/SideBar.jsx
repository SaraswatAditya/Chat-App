import { useTheme } from "@emotion/react";
import {
  Box,
  Divider,
  IconButton,
  Stack,
  Avatar,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import { Gear } from "phosphor-react";
import React, { useState } from "react";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import logo from "../../assets/Images/logo.ico";
import { useNavigate } from "react-router-dom";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";

    case 1:
      return "/group";

    case 2:
      return "/call";

    case 3:
      return "/settings";

    default:
      break;
  }
};

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";

    case 1:
      return "/settings";

    case 2:
      //update token and set is Auth false
      return "/auth/login";
  }
};

const SideBar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { onToggleMode } = useSettings();

  return (
    <Box
      p={2}
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        height: "100vh",
        width: 100,
      }}
    >
      <Stack
        direction="column"
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%" }}
        spacing={3}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img src={logo} alt={"App Logo"} />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) => (
              <Box
                p={1}
                key={el.index} // Ensure key is unique
                sx={{
                  backgroundColor:
                    el.index === selected
                      ? theme.palette.primary.main
                      : "transparent",
                  borderRadius: 1.5,
                }}
              >
                <IconButton
                  onClick={() => {
                    setSelected(el.index);
                    navigate(getPath(el.index));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      el.index === selected
                        ? "#fff"
                        : theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              </Box>
            ))}
            <Divider sx={{ width: "48px" }} />
            <Box
              p={1}
              key="settings" // Use a unique string or value here
              sx={{
                backgroundColor:
                  selected === 3 ? theme.palette.primary.main : "transparent",
                borderRadius: 1.5,
              }}
            >
              <IconButton
                sx={{
                  width: "max-content",
                  color:
                    selected === 3
                      ? "#fff"
                      : theme.palette.mode === "light"
                      ? "#080707"
                      : theme.palette.text.primary,
                }}
                onClick={() => {
                  navigate(getPath(3));
                  setSelected(3);
                }}
              >
                <Gear />
              </IconButton>
            </Box>
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <AntSwitch
            defaultChecked={theme.palette.mode === "dark"}
            onChange={onToggleMode}
          />
          <Avatar
            id="profile-positioned-button"
            src={faker.image.avatar()}
            aria-controls={openMenu ? "profile-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            TransitionComponent={Fade}
            id="profile-positioned-menu"
            aria-labelledby="profile-positioned-button"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box p={1}>
              <Stack spacing={1}>
                {Profile_Menu.map((el, idx) => (
                  <MenuItem key={idx}>
                    <Stack
                      onClick={() => {
                        navigate(getMenuPath(idx));
                      }}
                      sx={{ width: 100 }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>{" "}
                  </MenuItem>
                ))}
              </Stack>
            </Box>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
