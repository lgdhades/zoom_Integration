import "./App.css";
import { ZoomMtg } from "@zoomus/websdk";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import React, { useState } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider } from "@mui/material";
import UserList from "./component/UserList";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const App = () => {
  const client = ZoomMtgEmbedded.createClient();

  let signature = "";
  const signatureEndpoint = "http://localhost:3001";
  const [passCode, setPassCode] = useState("657503");
  const [meetingNumber, setMeetingNumber] = useState("2546047804");
  const sdkKey = "vbXpOSmPyf7LlFPgnBlYgM5QlqRqxCwj1dXb"; // enter API Key
  const apiSecret = "GgMwuXepz59Em6Ez8zpfGDUqIPClWrSbEO4X"; // enter API Secret
  let userName = "alexsis.k.claman";
  let userEmail = "alexsis.k.claman@gmail.com";
  let role = 0; // 1 for host and 0 for participants.

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleJoinButton = (event) => {
    generateSignature().then(
      (result) => {
        let meetingSDKElement = document.getElementById("meetingSDKElement");
        client.init({
          debug: true,
          zoomAppRoot: meetingSDKElement,
          language: "en-US",
          customize: {
            meetingInfo: [
              "topic",
              "host",
              "mn",
              "pwd",
              "telPwd",
              "invite",
              "participant",
              "dc",
              "enctype",
            ],
            toolbar: {
              buttons: [
                {
                  text: "Custom Button",
                  className: "CustomButton",
                  onClick: () => {
                    console.log("custom button");
                  },
                },
              ],
            },
            video: {
              isResizable: true,
              viewSizes: {
                default: {
                  width: 1000,
                  height: 600,
                },
                ribbon: {
                  width: 300,
                  height: 700,
                },
              },
            },
          },
        });

        client.join({
          sdkKey: sdkKey,
          signature: result,
          meetingNumber: meetingNumber,
          password: passCode,
          userName: userName,
        });
      },
      (error) => {
        console.log("error");
      }
    );
  };

  // generateSignature = (event) => {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const signature = ZoomMtg.generateSignature({
  //         meetingNumber: this.state.meetingNumber,
  //         sdkKey: this.state.sdkKey,
  //         apiSecret: this.state.apiSecret,
  //         role: this.state.role,
  //       });
  //       resolve(signature);
  //     } catch (e) {
  //       reject(Error("generate signature rejected"));
  //     }
  //   });
  // };

  const generateSignature = () => {
    return new Promise((resolve, reject) => {
      fetch(signatureEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber: meetingNumber,
          role: role,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response.signature);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
              component="div"
            >
              Spoke Mine
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Main open={open}>
          <DrawerHeader />
          <div id="meetingSDKElement">
            {/* <!-- Zoom Meeting SDK Rendered Here --> */}
          </div>
          <div style={{ width: "50%", textAlign: "center" }}>
            <h2 className="meeting-header">Join Meeting</h2>
            <div className="meeting-container">
              <div>
                <label for="meetingid">Meeting Number</label>
                <input
                  type="text"
                  id="meetingid"
                  placeholder="Meeting Number"
                  value={meetingNumber}
                  onChange={(e) => setMeetingNumber(e.target.value)}
                />
              </div>
              <div>
                <label for="passcode">Passcode</label>
                <input
                  type="text"
                  placeholder="Passcode"
                  value={passCode}
                  onChange={(e) => setPassCode(e.target.value)}
                />
              </div>
            </div>
            <div className="action-continer">
              <button
                className="join-meeting-button"
                onClick={handleJoinButton}
              >
                Join Meeting
              </button>
            </div>
          </div>
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              User List
            </Typography>
          </DrawerHeader>
          <Divider />
          <UserList />
        </Drawer>
      </Box>
    </div>
  );
};

export default App;
