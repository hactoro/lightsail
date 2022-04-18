const express = require('express');
const app = express();
const env = require('dotenv');

const port = 5003;
env.config();


app.get('/', (req, res)=>{
    console.log("main")
    res.send("hello");
})
app.listen(port, ()=>{
    console.log(`listen on port : ${port}`);
})