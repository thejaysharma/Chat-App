const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./DBConnection");
const userRoute = require("./Routes/userRoute");
const authRoute = require("./Routes/auth");


//database connection
connection();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Listening on ${port}`))