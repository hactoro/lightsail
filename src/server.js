const express = require('express');
const app = express();

const port = 5003;

app.get('/', (req, res)=>{
    console.log("main")
    res.send("hello");
})
app.listen(port, ()=>{
    console.log(`listen on port : ${port}`);
})