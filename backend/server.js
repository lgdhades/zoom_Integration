const express = require("express");
const mongoose = require("mongoose");

// const users = require("./routes/api/users");

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
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// // Routes
// app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
