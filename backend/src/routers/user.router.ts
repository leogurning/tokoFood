import { Router } from 'express';
import { sample_users } from '../data';
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
     const usersCount = await UserModel.countDocuments();
     if(usersCount> 0){
       res.send("Seed is already done!");
       return;
     }

     await UserModel.create(sample_users);
     res.send("Seed Is Done!");
 }
));

router.post("/login", asyncHandler(
  async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    //Check the user result and compare the hash password
    if(user && ( await bcrypt.compare(password, user.password) )) {
      //Must convert the mongoose Document user result to Object
      //in order to be able to add new atribute token later on
      //assign the key password to the variable _ indicating it will be unused for security reason
      //const userActive = user.toObject();
      const {password: _, ...userActive} = user.toObject();
      res.send(generateTokenReponse(userActive));
    }
    else{
      res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
    }

  }
));

/** 
router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email 
      && user.password === password);
  
    if(user) {
      res.send(generateTokenReponse(user));
    } else {
      const BAD_REQUEST = 400;
      res.status(BAD_REQUEST).send("Username or password is invalid!");
    }
});
*/
router.post('/register', asyncHandler(
  async (req, res) => {
    const {name, email, password, address} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      res.status(HTTP_BAD_REQUEST)
      .send('User is already exist, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);
    const {password: _, ...userActive} = dbUser.toObject();
    res.send(generateTokenReponse(userActive));
  }
));

const generateTokenReponse = (user : any) => {
    const token = jwt.sign({
      email: user.email, isAdmin: user.isAdmin
    },"SomeRandomText",{
      expiresIn: "30d"
    });
    //Add token atribute to user object
    user.token = token;
    return user;
};

export default router;