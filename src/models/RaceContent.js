const {Schema, model} = require('mongoose');

const RaceContentSchema = Schema({
    name: {type:String, required:true},
    src: {type:String, required:true},
    category: {type:String, required: true},
    statics: {
        win: {type:Number},
        lose: {type:Number}
    }
},{
    timestams: true
});

const RaceContent = model("RaceContent", RaceContentSchema);
module.exports = {RaceContent};