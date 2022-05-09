const { Router } = require('express');
const { RaceContent } = require('../models');
const { RaceList } = require('../models/RaceList');
const { isValidObjectId } = require('mongoose');

const raceRouter = Router();

raceRouter.get('/player/:id', async(req, res)=>{
    
    try{
        const {id} = req.params;
        if(!isValidObjectId(id)) throw new Error("Id is not valid");
        const player = await RaceContent.findById(id);
        res.send({player: player});

    }catch(err){
        res.status(400).send({err:err.message});
    }


})


raceRouter.get('/', async(req, res)=>{
    const { categoryId, limit } = req.query;
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


// 게임별 최종우승, 승리, 패배 기록
raceRouter.patch('/result/set/list', async(req, res)=>{
    try{
        const {raceRecords} = req.body;
        
        raceRecords.map( async(item)=>{
            // if(!isValidObjectId(item.id)) 
            const addFinalCnt = item.finalCnt;
            const addWinCnt = item.winCnt;
            const addLoseCnt = item.loseCnt;
            
            console.log(item);
            
            const player = await RaceContent.findById({_id:item.id});
            
            let newFinalCnt = 0;
            let newWinCnt = 0;
            let newLoseCnt = 0;
            
            if (addFinalCnt){
                if(player.statics.finalWin) newFinalCnt = player.statics.finalWin + 1;
                else newFinalCnt = 1;
            }else{
                newFinalCnt = player.statics.finalWin;
            }
            if (addWinCnt){
                if(player.statics.win) newWinCnt = player.statics.win + addWinCnt;
                else newWinCnt = 1;
            }else{
                newWinCnt = player.statics.win;
            }
            if (addLoseCnt){
                if(player.statics.lose) newLoseCnt = player.statics.lose + 1;
                else newLoseCnt = 1;
            }else{
                newLoseCnt = player.statics.lose;
            }
            
            await RaceContent.findByIdAndUpdate(
                {_id:item.id}, 
                {
                    $set: {
                        
                        'statics.finalWin': newFinalCnt,
                        'statics.win': newWinCnt,
                        'statics.lose': newLoseCnt
                    }
                }
                ); 
            })
            
            res.status(200).send({message:"success"})
            
        }catch(err){
            res.status(400).send({err:err.message});
        }
        
    });
    
    // id별 승자 기록
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

// 순위 
raceRouter.get('/ranks', async(req, res)=>{
    try{
        const { cateId } = req.query; //pagination은 차후!
        const ranks = await RaceContent.find({categoryId: cateId}).limit(10).sort({'statics.finalWin': 'desc', 'statics.win':'desc'});

        res.send({ranks: ranks})
        

    }catch(err){
        res.status(400).send({err:err.message})

    }

})

module.exports = {raceRouter};
