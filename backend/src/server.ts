import dotenv from 'dotenv';
dotenv.config();
//with dotenv, we can access all global vars in .env file
//e.g: process.env.MONGO_URI

import express from "express";
import cors from "cors";
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';

//Connect init to MongoDb atlas
import { dbConnect } from './configs/database.config';
dbConnect();

const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});