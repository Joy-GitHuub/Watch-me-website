const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = mongoose.Schema({
    postedBy: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },

    title: {
        type: String,
        required: [true, 'Your Image Name is Required'],
        trim: true,
    },

    pin: {
        type: String,
        required: [true, 'Pin is Required.']
    },

    category: {
        type: String,
        enum: {
            values: ['Wallpapers', 'Animation', '3D Renders', 'Travel', 'Nature', 'Street Photography', 'Experimental', 'Textures Patterns', 'Animals', 'Architecture Interiors', 'Fashion Beauty', 'Film', 'Food Drink', 'People', 'Spirituality', 'Business Work', 'Athletics', 'Health Wellness', 'Current Events', 'Arts Culture'],
            message: "Category value can't be {VALUE},"
        },
        required: [true, 'Category Name is Required'],
    },


    photoURL: {
        // type: String,
        // required: [true, "Please Provide a Photo."],
    },

    like: [{ type: ObjectId, ref: "User" }],

    view: {
        type: Number,
        default: 0,
    },

    downloadCount: {
        type: Number,
        default: 0,
    },

    comments: [{
        commentBy: { type: ObjectId, ref: 'User' },
        comment: { type: String, },
    }],

}, { timestamps: true });

const post = mongoose.model('Post', postSchema);

module.exports = post;