const { Router } = require('express');
const { RaceContent } = require('../models');
const { RaceList } = require('../models/RaceList');

const raceRouter = Router();

raceRouter.get('/', async(req, res)=>{
    const { categoryId, limit } = req.query;
    console.log(categoryId);
    try{
        if(!limit) throw new Error("Ideal race round number is required");
        const candidates = await RaceContent.find({categoryId:categoryId}).limit(limit);
        res.send({candidates: candidates});
    }catch(err){
        res.send({err: err.message});
    }
}) 

raceRouter.post('/enroll', async(req, res)=>{
    try{
        const { name, src, categoryId, mediaType } = req.body;
        if (!name || !src || !categoryId || !mediaType) 
            throw new Error(`이름: ${name}, src: ${src}, category: ${categoryId}, mediaType: ${mediaType} 모두 필요합니다.`)
        
        const race = new RaceContent({
            name: name,
            src: src,
            categoryId: categoryId,
            mediaType: mediaType
        })
        await race.save();
        res.send(race);

    }catch(err){
        res.status(400).send({err: err.message});
    }
});

raceRouter.get('/racelist', async(req,res)=>{
    try{
        console.log("hello?");
        const raceList = await RaceList.find();
        res.send({raceList: raceList});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

raceRouter.post('/racelist', async(req, res)=>{
    try{
        const { title, content, src, mediaType } = req.body;
        if(!title || !src || !mediaType) throw new Error(`제목: ${title}, 이미지소스: ${src}, 미디어타입: ${mediaType} 은 모두 필요로 합니다.`);
        const race = new RaceList({
            title: title,
            content: content,
            src: src,
            mediaType: mediaType
        })
        await race.save();
        res.send(race);
    }catch(err){
        res.send({err:err.message})
    }
});

module.exports = {raceRouter};
