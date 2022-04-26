const express = require('express');
const app = express();
const env = require('dotenv');
const path = require("path");
const mongoose = require('mongoose');
const {raceRouter} = require('./routes');
const cors = require('cors');


const { PORT, MONGO_URI } = process.env;

const server = async () => {

    await mongoose.connect(MONGO_URI);
    console.log("mongo db connected!");
    
    app.use(cors());
    app.use(express.json());

    app.use(express.static(path.join(__dirname, "../killkilltime/build")));
    app.get("/", (req, res)=>{
            res.sendFile(path.join(__dirname, "../killkilltime/build", "index.html"))
    })
    app.use('/admin/contents/race', raceRouter);
    app.listen(PORT, ()=>{
        console.log(`listen on port: ${PORT}`);
    })
    
}

if(!MONGO_URI) {
    console.log("MONGO_URI 가 필요합니다. 환경 변수 셋팅을 해주세요.");
}else{
    server();
}




