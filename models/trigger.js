
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Trigger = new Schema(
    {
        enterTime: { type: Date, required: true},
        exitTime: { type: Date, required: true },
        cat_id:{type:Schema.Types.ObjectId, ref:"cat_id"},

    },
    { timestamps: true },
)

module.exports = mongoose.model('Trigger', Trigger)