const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    // users: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    name: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        default: 0
    },
    lng:{
        type: Number,
        default: 0
    },
    posts: [{
        post: {
            type: Schema.Types.ObjectId,
            ref: "posts"
        },
    }],
    weather: {
        type: String,
        default: "default"
    }
});

const Region = mongoose.model('region', RegionSchema);

module.exports = Region;