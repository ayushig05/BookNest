const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./db/conn");

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

const user = require("./routes/user");
const book = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/v1/", user);
app.use("/api/v1/", book);
app.use("/api/v1/", favourite);
app.use("/api/v1/", cart);
app.use("/api/v1/", order);

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
