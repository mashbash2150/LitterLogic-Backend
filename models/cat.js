
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cat = new Schema(
    {
        name: { type: String, required: true},
        age: { type: String, required: false},
        vet: { type: String, required: false},
        healthConditions: { type: Array, required: false },
        weight: { type: Number, required: false },
        //userId:{type:Schema.Types.ObjectId,ref:"userId "},
        trigger_id:{type:Schema.Types.ObjectId,ref:"Trigger"}

    },
    { timestamps: true },
)

module.exports = mongoose.model('Cat', Cat)