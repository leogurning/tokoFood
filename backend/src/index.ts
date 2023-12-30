import dotenv from 'dotenv';
dotenv.config();
//with dotenv, we can access all global vars in .env file
//e.g: process.env.MONGO_URI

import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';

//Connect init to MongoDb atlas
import { dbConnect } from './configs/database.config';
import orderRouter from './routers/order.router';
dbConnect();

const app = express();
app.use(express.json());

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200", /\.vercel\.app$/],
    maxAge: 86400
}));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Used by load balancer to make sure we are taking requests
app.get('/healthcheck', (req, res) => res.send('System status: Ok'));

// basic routes
app.get('/', (req, res) => {
  res.send(`tokoFood API is running at PORT:${port}/api`);
});

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const port = 5000;
app.listen(port, () => {
    console.log("Website API Server is listening at PORT " + port);
});