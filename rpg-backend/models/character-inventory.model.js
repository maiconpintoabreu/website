const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CharacterInventorySchema = new Schema({
    capacity:{type: Number, required: true, default: 10},
    items:{type: String},
    character: { type: mongoose.Schema.Types.ObjectId, ref: 'Character' },
    dateCreated: {type: Date, required: true, default:new Date()},
    dateModified: {type: Date, required: true, default:new Date()},
});

module.exports =  mongoose.model("CharacterInventory",CharacterInventorySchema);