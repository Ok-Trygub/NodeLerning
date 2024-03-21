const express = require('express');
const users = require('./db');

const app = express();
app.use(express.json());

const port = 4300;


app.get('/users', (req, res) => {
    return res.json(users);
})

app.post('/users', (req, res) => {
    users.push(req.body);
    return res.json(req.body);
});

app.put('/users/:userId', (req, res) => {
    users.map( user => {
        if(user.id === req.body.id){
            user.userName = req.body.userName
        }
    });
    return res.json(req.body);
});

app.delete('/users/:userId', (req, res) => {
    users.filter(user => user.id !== req.body.id);
    return res.json(req.body);
});


app.listen(port, () => {
    console.log(`NodeLearning app listening on port ${port}`)
})
