const express = require("express");
require("dotenv").config();
require("./db/conn");
const user = require("./routes/user");
const book = require("./routes/book");
const favourite = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

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
