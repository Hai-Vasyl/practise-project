const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve("client")));
app.use(express.static(path.resolve("node_modules")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
