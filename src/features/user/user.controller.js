import jwt from 'jsonwebtoken'
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt'

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository;
    }

    async signUp(req, res){
        const {name, email, password, type} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = {name, email, password: hashedPassword, type};
        await this.userRepository.signUp(user);
        res.status(201).send(user);
    }

    async logIn(req, res){
        try{
            const user = await this.userRepository.findByEmail(req.body.email);
            if (!user){
                return res.status(400).send('Incorrect Credentials');
            }else{
                const result = await bcrypt.compare(req.body.password, user.password)
                if (result){
                    const token = jwt.sign(
                        {userId: user._id, email: user.email},
                        process.env.JWT_SECRET,
                        {expiresIn: '1h'}
                    )
                    return res.status(200).send(token);
                }else{
                    return res.status(400).send("incorrect credentials")
                }
            }
        }catch(err){
            console.log(err)
        }
    }
}