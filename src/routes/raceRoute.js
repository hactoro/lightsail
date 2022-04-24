const { Router } = require('express');
const { RaceContent } = require('../models')

const raceRouter = Router();

raceRouter.get('/:num', async(req, res)=>{
    const { num } = req.params;
    try{
        if(!num) throw new Error("Ideal race round number is required");
        const candidates = await RaceContent.find().limit(num);



        res.send({candidates: candidates});
    }catch(err){
        res.send({err: err.message});
    }
}) 

raceRouter.post('/enroll', async(req, res)=>{
    try{
        console.log("hello");
        const { name, src, category } = req.body;
        if (!name || !src || !category) 
            throw new Error(`이름: ${name}, src: ${src}, category: ${category} 모두 필요합니다.`)
        
        const race = new RaceContent({
            name: name,
            src: src,
            category: category
        })
        await race.save();
        res.send(race);

    }catch(err){
        res.status(400).send({err: err.message});
    }
});

module.exports = {raceRouter};
