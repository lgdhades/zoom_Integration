import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MyDrawerHeader = ({ setData }) => {
  const theme = useTheme();

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  return setData === null ? (
    <DrawerHeader />
  ) : (
    <DrawerHeader>
      <IconButton
        onClick={() => {
          setData(false);
        }}
      >
        {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        User List
      </Typography>
    </DrawerHeader>
  );
};

export default MyDrawerHeader;
