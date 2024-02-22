require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");

port = process.env.PORT || 3000;

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/chat", chatRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});