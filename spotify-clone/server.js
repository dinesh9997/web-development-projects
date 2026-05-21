const express = require("express");
const path = require("path");
const serveIndex = require("serve-index");

const app = express();
const PORT = process.env.PORT || 10000;


app.use(express.static(__dirname));


app.use("/songs", serveIndex(path.join(__dirname, "songs"), { icons: true }));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});