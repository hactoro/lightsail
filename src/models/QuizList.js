const { Schema, model, Types } = require('mongoose');

const QuizListSchema = Schema({
    title: {type: String, required: true, unique: true},
    content: {type: String },
    src: {type: String, required: true},
    mediaType: { 
                type: String, 
                required: true,
                enum: ['img', 'video']
            }
})


const QuizList = model("QuizList", QuizListSchema);

module.exports = {QuizList};