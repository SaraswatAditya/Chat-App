import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const LockPopup = ({ onUnlock }) => {
  const theme = useTheme();
  const [inputCode, setInputCode] = useState("");

  const defaultCode = "1234"; // Default code

  const handleNumberClick = (num) => {
    if (inputCode.length < 4) {
      setInputCode(inputCode + num);
    }
  };

  const handleUnlock = () => {
    if (inputCode === defaultCode) {
      localStorage.removeItem("appLocked");
      onUnlock();
      window.location.reload();
    } else {
      alert("Incorrect Code");
    }
  };

  const handleClear = () => {
    setInputCode("");
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
        color: theme.palette.mode === "light" ? "#080707" : "#F0F4FA",
      }}
    >
      <Box
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
          padding: 4,
          borderRadius: 2,
          textAlign: "center",
          zIndex: 1301, // Ensure it is above everything else
        }}
      >
        <Typography variant="h6" className="p-4">
          Enter PIN to Unlock
        </Typography>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1} justifyContent="center">
            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="center">
            {[4, 5, 6].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="center">
            {[7, 8, 9].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button onClick={handleClear}>*</Button>
            <Button onClick={() => handleNumberClick("0")}>0</Button>
            <Button>#</Button>
          </Stack>
        </Stack>
        <Typography variant="h6" className="p-4">
          {inputCode}
        </Typography>
        <Stack direction="row" spacing={1} mt={2} justifyContent="center">
          <Button
            sx={{
              color: theme.palette.mode === "light" ? "#080707" : "#F0F4FA",
            }}
            onClick={handleUnlock}
          >
            Unlock
          </Button>
          <Button
            sx={{
              color: theme.palette.mode === "light" ? "#080707" : "#F0F4FA",
            }}
            onClick={handleClear}
          >
            Clear
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default LockPopup;
