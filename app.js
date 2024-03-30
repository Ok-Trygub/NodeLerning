const bodyParser = require('body-parser');
const express = require('express');
const mongoService = require('./databaseService');

const app = express();


app.use(express.json());
app.use(bodyParser.json());

const port = 4500;

mongoService.connectToMongoDB().then(() => {
    console.log('Connected to MongoDB');


    app.get('/users', async (req, res) => {
        try {
            const users = await mongoService.getItems();
            res.json(users);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    });


    app.post('/users', async (req, res) => {
        const {name} = req.body;
        try {
            const newUser = await mongoService.createItem(name);
            res.json(newUser);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    });

    app.put('/users/:id', async (req, res) => {
        const {name} = req.body;
        const {id} = req.params;
        try {
            const updatedUser = await mongoService.updateItem(id, name);
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    });

    app.delete('/users/:id', async (req, res) => {
        const {id} = req.params;
        try {
            const updatedUser = await mongoService.deleteItem(id);
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({error: err.message})
        }
    });


    app.listen(port, () => {
        console.log(`NodeLearning app listening on port ${port}`)
    })

}).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1)
})


