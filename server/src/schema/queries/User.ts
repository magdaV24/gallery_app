
import { hash } from "bcryptjs";
import bcrypt from 'bcryptjs';
import { Users } from "../entities/Users";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const create_user = async (req: any, res: any) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const avatar = req.body.avatar;
  const website = req.body.website;

  const existingUsername = await Users.findOne({ where: { username }});
  const existingEmail = await Users.findOne( {where: { email }})

  if(existingUsername){
     return res.json("This username is taken!")
  }
  
  if(existingEmail){
    return res.json("This email is in use!")
 }
  const hashedPassword: any =  ( await hash(password, 12)).toString();

    const result = await Users.insert({
      username,
      password: hashedPassword,
      email,
      avatar,
      website,
    }).then(() => console.log("success")).catch((err) => console.log(err))

    return res.json("Account created successfully!")
};

export const login = async (req:any, res: any)=>{
  const username = req.body.username;
  const password = req.body.password;

  const findUser = await Users.findOne({where: {username}});

  if(!findUser){
    throw new Error("User not found!");
  }

  const checkPassword = bcrypt.compare(password, findUser.password)

  if(!checkPassword){
    throw new Error("Incorrect password!");
  }

  const secret = process.env.JWT_SECRET || "jwt_secret"
  const token = jwt.sign({
    id: findUser.id, email: findUser.email
  }, secret, {expiresIn: '1h'})
  

  return res.json({username: findUser.username, email: findUser.email, website: findUser.website, avatar: findUser.avatar, token: token}); 
}


export const get_user_by_username = async (req: any, res: any) =>{
  const username = req.body.user;

  const response = await Users.findOne({ where: { username } });
  if (response === null) {
    return;
  }

  return res.json(response);
}