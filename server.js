const express = require("express");
// const db = require("./db/db.json");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");
const PORT = process.env.PORT || 5500;

// dynamically set the port
const app = express();

//setting up the middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//html routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
