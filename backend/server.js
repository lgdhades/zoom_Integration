// Bring in environment secrets through dotenv
require("dotenv/config");

// Use the request module to make HTTP requests from Node
const request = require("request");

const express = require("express");
const mongoose = require("mongoose");

const app = express();
// BodyParser Middleware
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// DB config
const db = require("./config/keys.js").mongoURI;

// connect to mongoDB
mongoose
  .set("strictQuery", true)
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  // Step 1:
  // Check if the code parameter is in the url
  // if an authorization code is available, the user has most likely been redirected from Zoom OAuth
  // if not, the user needs to be redirected to Zoom OAuth to authorize

  if (req.query.code) {
    // Step 3:
    // Request an access token using the auth code

    let url =
      "https://zoom.us/oauth/token?grant_type=authorization_code&code=" +
      req.query.code +
      "&redirect_uri=" +
      process.env.redirectURL;

    request
      .post(url, (error, response, body) => {
        // Parse response to JSON
        body = JSON.parse(body);

        // Logs your access and refresh tokens in the browser
        console.log(`access_token: ${body.access_token}`);
        console.log(`refresh_token: ${body.refresh_token}`);

        if (body.access_token) {
          // Step 4:
          // We can now use the access token to authenticate API calls

          // Send a request to get your user information using the /me context
          // The `/me` context restricts an API call to the user the token belongs to
          // This helps make calls to user-specific endpoints instead of storing the userID

          request
            .get(
              "https://api.zoom.us/v2/report/meetings/" +
                req.body.meetingId +
                "/participants",
              (error, response, body) => {
                if (error) {
                  console.log("API Response Error: ", error);
                } else {
                  body = JSON.parse(body);
                  // Display response in console
                  console.log("API call ", body);
                  /////// Response Participant List
                  res.send(body.participants);
                }
              }
            )
            .auth(null, null, true, body.access_token);
        } else {
          // Handle errors, something's gone wrong!
          console.log("something is wrong");
        }
      })
      .auth(process.env.clientID, process.env.clientSecret);

    return;
  }

  // Step 2:
  // If no authorization code is available, redirect to Zoom OAuth to authorize
  res.redirect(
    "https://zoom.us/oauth/authorize?response_type=code&client_id=" +
      process.env.clientID +
      "&redirect_uri=" +
      process.env.redirectURL
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
