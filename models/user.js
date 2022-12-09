
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        firstName: { type: String, required: true},
        lastName: { type: String, required: false},
        email: { type: String, required: true },
        notes: { type: String, required: false },
        catId:{type:Schema.Types.ObjectId,ref:"cat_id"},

    },
    { timestamps: true },
)

module.exports = mongoose.model('User', User)