import {config} from 'dotenv';

config();

import 'reflect-metadata';
import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from "helmet";
import hpp from 'hpp';
import bodyParser from 'body-parser';
import cors from 'cors';
import {AppDataSource} from './data-sourсe';
import routesPath from './routes/auth'


const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(hpp());

app.use('/api/auth', routesPath);


app.get('/', (req, res) => {
    res.send('Hello from server!')
});

app.use((req, res) => {
    console.error(res);
    res.status(400).send('Bad Request!');
});

app.use((req, res) => {
    console.error(res);
    res.status(500).send('Something broke!');
});

const PORT: number = parseInt(process.env.PORT || '4400', 10)

AppDataSource.initialize()
    .then(async () => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    })
    .catch((error) => console.log('Error: ', error))
