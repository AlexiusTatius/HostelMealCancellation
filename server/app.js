const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

dotenv.config({ path: './config.env' });

require('./db/conn');
const {User, Admin} = require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy 
app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.get('/signin', (req, res) => {
    res.send(`Hello Login world from the server`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world from the server`);
});

app.get('/admin/signin', (req, res) => {
    res.send(`Hello admin Login world from the server`);
});

app.get('/admin/signup', (req, res) => {
    res.send(`Hello admin Registration world from the server`);
});

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})