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
    if(tweets.length <= 10){
        if(tweets.length === 0){
            res.status(200).send([]);
        } else {
            const sent = tweets.map((tweet) => {
                const person = user.find((single) => single.username === tweet.username);
                const avatar = person ? person.avatar : null;
                return { ...tweet, avatar, username: tweet.username, tweet: tweet.tweet };
              });
            res.status(200).send({sent});
        }
    } else{
        const last10 = tweets.slice(-10);
        const sent = last10.map((tweet) => {
            const person = user.find((single) => single.username === tweet.username);
            const avatar = person ? person.avatar : null;
            return { ...tweet, avatar, username: tweet.username, tweet: tweet.tweet };
          });
        res.send(sent);
    }

})

application.post('/tweets', (req, res) =>{
    const {username, tweet} = req.body;
    if(user.find((logged) => logged.username !== username)){
        res.status(401).send('UNAUTHORIZED');
        return;
    }
    let single = {
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