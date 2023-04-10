import cors from 'cors';
import express from "express";

const application = express();
application.use(cors({origin: 'http://127.0.0.1:5501'}));
application.use(express.json());

let user = [];
let tweets = [];
let url = '';

application.post('/sign-up', (req, res) =>{
    const {username, avatar} = req.body;
    user.push({username, avatar});
    console.log(user);
    url = avatar;
    res.status(200).send('OK');   
})

application.get('/tweets', (req, res) =>{
    if(tweets.length === 0){
        res.send([]);
    } else {
        res.send({tweets});
    }
})

application.post('/tweets', (req, res) =>{
    const {username, tweet} = req.body;
    if(user.find((logged) => logged.username !== username)){
        res.send('UNAUTHORIZED');
        return;
    }
    const single = {
        username: username,
        avatar: url,
        tweet: tweet
    }
    console.log(tweets);
    tweets.push(single);
    console.log(tweets);
    res.status(200).send('OK')

})

application.listen(5000, () => {
    console.log('teste, porta 5000');
})