const { Router } = require('express');
const { RaceContent } = require('../models');
const { RaceList } = require('../models/RaceList');
const { isValidObjectId } = require('mongoose');

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
        const { name, src, categoryId, mediaType, group } = req.body;
        if (!name || !src || !categoryId || !mediaType) 
            throw new Error(`이름: ${name}, src: ${src}, category: ${categoryId}, mediaType: ${mediaType} 모두 필요합니다.`)
        
        const race = new RaceContent({
            name: name,
            src: src,
            categoryId: categoryId,
            mediaType: mediaType,
            group: group
        })
        await race.save();
        res.send(race);

    }catch(err){
        res.status(400).send({err: err.message});
    }
});

raceRouter.patch('/win/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        if (!isValidObjectId(id)) throw new Error("id is not available");
        const finded = await RaceContent.findById({_id:id});
        let newWinCnt = 1;
        if (finded.statics.win){
            newWinCnt = finded.statics.win + 1;
        }
        const updated = await RaceContent.findByIdAndUpdate({_id:id},{'statics.win':newWinCnt},{new:true})
        
        res.send(updated);
    }catch(err){
        res.status(400).send({err:err.message})
    }
});

raceRouter.patch('/lose/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        if (!isValidObjectId(id)) throw new Error("id is not available");
        const finded = await RaceContent.findById({_id:id});
        let newLoseCnt = 1;
        if (finded.statics.lose){
            newLoseCnt = finded.statics.lose + 1;
        }
        const updated = await RaceContent.findByIdAndUpdate({_id:id},{'statics.lose':newLoseCnt},{new:true})
        
        res.send(updated);
    }catch(err){
        res.status(400).send({err:err.message})
    }
});

raceRouter.patch('/finalwin/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        if(!isValidObjectId(id)) throw new Error("id is not available");
        const finded = await RaceContent.findById({_id:id});
        let newFinalCnt = 1;
        if (finded.statics.finalWin){
            newFinalCnt = finded.statics.finalWin + 1;
        }
        const updated = await RaceContent.findByIdAndUpdate({_id:id},{'statics.finalWin':newFinalCnt},{ new:true})
        
        res.send(updated);
    }catch(err){
        res.status(400).send({err:err.message})
    }
})




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
