import "./App.css";

import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import CssBaseline from "@mui/material/CssBaseline";

import { Divider } from "@mui/material";
import UserList from "./component/UserList";
import MyAppBar from "./component/MyAppBar";
import MyDrawerHeader from "./component/MyDrawerHeader";

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

const App = () => {
  const client = ZoomMtgEmbedded.createClient();

  // let signature = "";
  const signatureEndpoint = "http://localhost:3001";
  const [passCode, setPassCode] = useState("657503");
  const [meetingNumber, setMeetingNumber] = useState("2546047804");
  const sdkKey = "vbXpOSmPyf7LlFPgnBlYgM5QlqRqxCwj1dXb"; // enter API Key
  // const apiSecret = "GgMwuXepz59Em6Ez8zpfGDUqIPClWrSbEO4X"; // enter API Secret
  let userName = "alexsis.k.claman";
  // let userEmail = "alexsis.k.claman@gmail.com";
  let role = 0; // 1 for host and 0 for participants.

  const [open, setOpen] = React.useState(false);

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
        <MyAppBar setData={setOpen} data={open} />

        <Main open={open}>
          <MyDrawerHeader setData={null} />
          <div id="meetingSDKElement">
            {/* <!-- Zoom Meeting SDK Rendered Here --> */}
          </div>
          <div style={{ width: "50%" }}>
            <h2 className="meeting-header">Join Meeting</h2>
            <div className="meeting-container">
              <div>
                <label htmlFor="meetingid">Meeting Number</label>
                <input
                  type="text"
                  id="meetingid"
                  placeholder="Meeting Number"
                  value={meetingNumber}
                  onChange={(e) => setMeetingNumber(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="passcode">Passcode</label>
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
          <MyDrawerHeader setData={setOpen} />
          <Divider />
          <UserList />
        </Drawer>
      </Box>
    </div>
  );
};

export default App;
