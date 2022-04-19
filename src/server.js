const express = require('express');
const app = express();
const env = require('dotenv');
const path = require("path");

console.log(path.join(__dirname, "../react-front/build"));
// env.config();

const { PORT } = process.env;
app.use(express.static(path.join(__dirname, "../react-front/build")));

app.get("/list", (req, res)=>{
    res.send({"message":"hello"});
})
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../react-front/build", "index.html"))
})

app.listen(PORT, ()=>{
    console.log(`listen on port : ${PORT}`);
})