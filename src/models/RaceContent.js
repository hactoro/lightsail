const {Schema, model, Types} = require('mongoose');


const RaceContentSchema = Schema({
    name: {type:String, required:true},
    group: {type:String},
    content: {type:String},
    src: {type:String, required:true},
    mediaType: {type:String, required:true},
    categoryId: {type:Types.ObjectId, required: true, ref: 'RaceList'},
    statics: {
        win: {type:Number},
        lose: {type:Number},
        finalWin: {type:Number}
    }
},{
    timestams: true
});

const RaceContent = model("RaceContent", RaceContentSchema);
module.exports = {RaceContent};