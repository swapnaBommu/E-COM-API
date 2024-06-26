import  UserModel  from "./user.model.js";
import jwt from 'jsonwebtoken';
export default class UserController {
    signUp(req,res) {
        const { name, email, password, type} = req.body;
        const user = UserModel.signUp(name,email,password,type);
        res.status(201).send(user);
    }
    signIn(req,res) {
        console.log(req.body)
        const {email, password} = req.body;
        const result = UserModel.signIn(email,password);
        if(!result){
            return res.status(400).send("InValid credentials");
        }else{
            //1. create a webToeken
            const token = jwt.sign(
                {
                    userId:result.id,
                    email: result.email
                    },
                    'HZmAKOhp52WitfLhLBlQcDPv2hRnxwJd',
                    {
                        expiresIn:'1h',
                    }
                    )
                //2.send Token
                return res.status(200).send(token);
            }
    }
}