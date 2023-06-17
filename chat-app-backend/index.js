const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./config/DBConnection");
const userRoute = require("./Routes/userRoute");

//database connection
connection();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", userRoute);


const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on ${port}`));