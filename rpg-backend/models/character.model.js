const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CharacterSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    inventory: {type: mongoose.Schema.Types.ObjectId, ref: 'CharacterInventory'},
    name: {type: String, required: true,unique: true,index: true},
    level:{type: Number, required: true, default: 1},
    location:{type: {x:Number,y:Number,z:Number}, required: true, default: {x:0.0,y:0.0,z:0.0} },
    rotation:{type: {roll:Number, pitch:Number, yaw:Number}, required: true, default: {roll:0.0,pitch:0.0,yaw:0.0} },
    dateCreated: {type: Date, required: true, default:new Date()},
    dateModified: {type: Date, required: true, default:new Date()},
});

module.exports =  mongoose.model("Character",CharacterSchema);