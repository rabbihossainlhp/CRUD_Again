require("dotenv").config();
const express = require("express");
const router = require("./routes/product.routes");
const dbConnection = require("./config/db");


const app = express();
app.use(express.json());

app.use("/api/v1",router)


//dbbb_Connection
dbConnection();


const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});