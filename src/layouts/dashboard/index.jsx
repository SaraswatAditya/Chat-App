import React, { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import LockPopup from "../../components/LockPopup";

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
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">App is Locked</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default DashboardLayout;
