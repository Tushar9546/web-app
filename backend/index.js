const express = require('express');
const { connection } = require('./config/db');
const { userController } = require("./routes/user.routes");

const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
const { authentication } = require('./middlewares/Authentication');
const { UserModel } = require('./models/User.model');

app.use(cors({ origin: "*" }));


app.get("/", (req, res) => {
    res.send("hello this is homepage");
})

app.use("/user", userController);


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connection to DB successfully");
    }
    catch (err) {
        console.log(err, "Error connecting to DB")
    }
    console.log(`Server is Listening on PORT http://localhost:${process.env.PORT}`)
})