const express = require("express");
const DBConnection = require("./config/db");

const app = express();

//DB Connection here
DBConnection();

//middleware
app.use(express.json({ extended: false }));

app.use("/api/person", require("./routes/person"));

const port = 5000;
app.listen(port, () => console.log(`Server running on ${port}`));
