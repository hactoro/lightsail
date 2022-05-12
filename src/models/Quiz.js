const {Schema, model, Types } = require('mongoose');
const { QuizList } = require('./QuizList');

const QuizSchema = new Schema({

    gameId: {type: Types.ObjectId, required: true, ref: QuizList, unique: true},
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    like: {type: Number, default:0},
    click: {type: Number, default: 0},
    workbook: [
        {
            src: {type: String, required: true},
            mediaType: {
                type: String,
                enum: ['img', 'video']
            },
            question: {type: String, required: true},
            example: [[
                {type: String, required: true},
                {type: String, required: true}
            ]],
            answer: [
                

                    {type:String, required: true},
                    {type:String, required: true}
                
            ]

        }
    ]



})

const Quiz = model('Quiz', QuizSchema);
module.exports = {Quiz}