import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = 8080;
const app = express();

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to MongoDB');
    } catch (error) {
        throw new error;
    }
};

mongoose.connection.on('Disconnected', () => {
    console.log('MongoDB was disconnected!');
});

//middlewares
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    connect();
    console.log('Connected to backend!');
});