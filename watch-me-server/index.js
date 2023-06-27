const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');

mongoose.set('strictQuery', false)

const db = `mongodb+srv://watch-me-project:watch-me-project@cluster0.garvawt.mongodb.net/?retryWrites=true&w=majority`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.connect(db, options).then(() => {
    console.log(`Watch-ME Database Connection is Successful`.green.bold);
});


// Middleware
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("Images"));
const port = 5000 || 8080;


// Routers Require 
const userRouter = require('./Routers/User.Router');
const postRouter = require('./Routers/Post.Router');


// // Routers App.use()
app.use('/api/watch-me/v1/user', userRouter);
app.use('/api/watch-me/v1/posts', postRouter)



app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Node JS Server Working is Perfect',
    });
});


app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
});


module.exports = app;
// module.exports = app;