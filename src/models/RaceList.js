const {Schema, model, Types} = require('mongoose');

const RaceListSchema = Schema({
    title: {type: String, required: true, unique: true},
    content: {type: String},
    src: {type: String, required: true},
    mediaType: {type: String, require: true}
});

const RaceList = model("RaceList", RaceListSchema);
module.exports = {RaceList};