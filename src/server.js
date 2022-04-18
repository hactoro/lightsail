const express = require('express');
const app = express();
const env = require('dotenv');


// env.config();

const { PORT } = process.env;
app.get('/', (req, res)=>{
    console.log("main")
    res.send("hello");
})
app.listen(PORT, ()=>{
    console.log(`listen on port : ${PORT}`);
})