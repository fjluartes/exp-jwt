const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const users = require('./users');
require('dotenv').config();

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/login', (req, res) => {
    var message;
    if (!users[req.body.username]) {
        message = "Invalid Username";
        res.send(message);
    } else {
        if (users[req.body.username].password != req.body.password) {
            message = "Invalid Password";
            res.send(message);
        } else {
            message = "Login Successful";
            var id = users[req.body.username].id;
            var name = users[req.body.username].username;
            var token = jwt.sign({ id: id, name: name }, process.env.SECRET);
            data = {
                id: id,
                name: name,
                token: token
            }
            res.send(data);
        }
    }
    console.log(message);
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});
