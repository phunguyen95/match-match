const express = require("express");
const mongoose = require("mongoose");
const getUserProfile = require("./routes/api/getUserProfile");
// const likedUsers = require("./routes/api/likedUsers");
// const matchedUsers = require("./routes/api/matchedUsers");
// const bodyParser = require('body-parser');
// const passport = require('passport');
const path = require("path");
const app = express();

//db config
const db = require("./configs/keys_dev");
// connect to mongoosedb
mongoose
    .connect(db.mongoURI, {
        dbName: db.dbName,
        useNewUrlParser: db.useNewUrlParser,
        useUnifiedTopology: db.useUnifiedTopology
    })
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log("vao");
        console.log(err);
    });
//passport middleware;
// app.use(passport.initialize());
//passport config
// require('./config/passport')(passport);
//use routes
//server static access if  in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(port);
});
