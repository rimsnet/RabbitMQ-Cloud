const express = require('express');
const app     = express();
const rabbitmq     = require('./rabbitmq');

app.use(express.json());

app.get('/', (req,res)=>{
    res.send('homepage');
});

app.get('/pub',(req,res)=>{
    rabbitmq.pub();
    res.send('pub');
});

app.get('/sub',(req,res)=>{

    rabbitmq.sub();
    res.send('sub');
})

app.listen(3000);