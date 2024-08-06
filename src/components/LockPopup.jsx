import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const LockPopup = ({ onUnlock }) => {
  const theme = useTheme();
  const handleLock = () => {
    localStorage.setItem("appLocked", "true");
    // onClose();
    window.location.reload();
  };

  const handleUnlock = () => {
    localStorage.removeItem("appLocked");
    onUnlock();
    // onClose();
    window.location.reload();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300, // Ensure it is above everything else
        color: "#080707",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          zIndex: 1301, // Ensure it is above everything else
        }}
      >
        <Typography variant="h6" className="p-4">App is Locked</Typography>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1} justifyContent="center">
            {[1, 2, 3].map((num) => (
              <Button
                key={num}
              >
                {num}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="center">
            {[4, 5, 6].map((num) => (
              <Button
                key={num}
              >
                {num}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="center">
            {[7, 8, 9].map((num) => (
              <Button
                key={num}
              >
                {num}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button >*</Button>
            <Button >0</Button>
            <Button>#</Button>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1} mt={2} justifyContent="center">
          <Button onClick={handleUnlock}>Unlock</Button>
          <Button onClick={handleLock}>Kept Lock</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LockPopup;
