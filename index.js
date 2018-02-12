const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const PORT = 3000;
// For demo purpose SECRET added here. This is not recommanded for Production
const SECRET = 'Put here your secret';

// MOCK CUSTOMER DATA
const customers = [{
    id: 1,
    name: 'abc',
    city: 'city1'
},{
    id: 2,
    name: 'xyz',
    city: 'city2'
}];

// MOCK USER DATA
const users = [];

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const middleware = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if(bearerToken){
        const token = bearerToken.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if(err){
                res.status(401).send("Not Authorized...");
                return;
            }
            req.user = user;
            next();
        })
    }else{
        res.status(401).send("Not Authorized...");
    }
}

app.post('/signup', (req, res) => {
    users.push(req.body);
    res.sendStatus(200);
});


app.post('/login', (req, res) => {
    // This is just demo purpose. User bcrypt lib and store into db and find user from DB
    // Check login below way is not recommanded for Production
    const filteredUsers = users.filter(user => req.body.username === user.username && req.body.password === user.password);
    if(filteredUsers.length > 0){
        const token = jwt.sign(filteredUsers[0], SECRET, {
            expiresIn: '5m'
        });
        res.setHeader('Authorization', 'Bearer ' + token);
        res.sendStatus(200);
    }else{
        res.status(401).send("Not Authorized...");
    }
});

app.post('/logout', (req, res) => {
    res.removeHeader('Authorization');
    res.sendStatus(200);
});

app.get('/customers', middleware, (req, res) => {
    res.json(customers);
});

app.listen(PORT, () => {
    console.log("Server started with port ", PORT);
});