const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "spotify-clone")));

app.use(
  "/songs",
  serveIndex(path.join(__dirname, "spotify-clone/songs"), {
    icons: true,
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});