import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB';
import router from './router/router';
import cors from 'cors';
import 'dotenv/config';

connectDB();
const app = express();
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use('/', router);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
