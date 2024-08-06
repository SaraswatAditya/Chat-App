import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Divider } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import LockPopup from "../../components/LockPopup";
import { ArrowFatLineRight } from "phosphor-react";

const isAuthenticated = true;

const DashboardLayout = () => {
  const [isLocked, setIsLocked] = useState(
    localStorage.getItem("appLocked") === "true"
  );

  useEffect(() => {
    setIsLocked(localStorage.getItem("appLocked") === "true");
  }, []);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Stack direction="row">
      {isLocked && <LockPopup onUnlock={handleUnlock} />}
      {!isLocked ? (
        <>
          <SideBar />
          <Outlet />
        </>
      ) : (
        <>
          <Stack sx={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">App is Locked</Typography>
          </Box>
          <Typography 
          sx={{display:"flex"}}
          variant="h6">
            <ArrowFatLineRight /> "Use 1234 to unlock"
          </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default DashboardLayout;
