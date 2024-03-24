const express = require('express');
const databaseService = require('./services/databaseService');

const app = express();
app.use(express.json());

const port = 4300;

app.get('/users', async (req, res) => {
    databaseService.getItems((err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.json(result)
    })
})

app.post('/users', (req, res) => {
    const {name} = req.body;
    databaseService.createItem(name, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.json(result)
    })
});

app.put('/users/:userId', (req, res) => {
    const {userId} = req.params;
    const {name} = req.body;
    databaseService.updateItem(userId, name, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.json(result)
    })
});

app.delete('/users/:userId', (req, res) => {
    const {userId} = req.params;
    databaseService.deleteItem(userId, (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        res.json(result)
    })
});


app.listen(port, () => {
    console.log(`NodeLearning app listening on port ${port}`)
})
