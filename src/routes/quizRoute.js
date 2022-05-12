const { Router } = require('express');
const { QuizList } = require('../models/QuizList');
const {Quiz} = require('../models/Quiz')


const quizRouter = Router();

quizRouter.post('/list/add', async(req, res)=>{

    try{
        const {title, content, src, mediaType} = req.body;
        if(!title || !src || !mediaType)
            throw new Error(`제목: ${title}, src: ${src}, mediaType: ${mediaType} is required!`)

        const quizList = new QuizList({
            title: title,
            content: content,
            src: src,
            mediaType: mediaType
        });
        await quizList.save();
        res.send(quizList);

    }catch(err){
        res.status(400).send({err:err.message});
    }
})

quizRouter.get('/list', async(req, res)=>{
    try{
        const quizList = await QuizList.find();
        res.send({quizList: quizList});

    }catch(err){
        res.status(400).send({err:err.message});
    }
})


quizRouter.post('/add', async(req, res)=>{
    try{
        const { gameId, title, description, like, click, workbook } = req.body;
        
        const quiz = new Quiz({
            gameId: gameId,
            title: title,
            description: description,
            like: like,
            click: click,
            workbook: workbook
        });
        await quiz.save();

        res.send({quiz:quiz});
    }catch(err){
        res.status(400).send({err:err.message});
    }
})

quizRouter.get('/game/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        const quizGame = await Quiz.findOne({gameId: id});
        console.log(quizGame    )
        
        res.send({quiz: quizGame});

    }catch(err){
        res.status(400).send({err:err.message});
    }
})
module.exports = {quizRouter}