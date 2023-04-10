import cors from 'cors';
import express from "express";

const application = express();
application.use(cors({origin: 'http://127.0.0.1:5501'}));
application.use(express.json());

let user = [];

application.post('/sign-up', (req, res) =>{
    const {username, avatar} = req.body;
    user.push({username, avatar});
    console.log(user);
    res.send({message: 'OK'});   
})

application.listen(5000, () => {
    console.log('teste, porta 5000');
})