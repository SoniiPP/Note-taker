const express = require("express");
// / // const db = require("./db/db.json");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");
const PORT = process.env.PORT || 5500;

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes); // Prefix API routes with /api
app.use("/", htmlRoutes); // Prefix HTML routes with /

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
