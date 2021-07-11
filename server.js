const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./conf/dev");
const app = express();
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if(err) console.log(err)
    else console.log("Connected to mongoDB...")
})

// json middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use('/user', require("./routes/User")); // User Related Routes


const port = process.env.PORT || 8000;
app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log(`Listening to port ${port}...`);
})