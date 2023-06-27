const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({

    displayName: {
        type: String,
        required: [true, 'Name is Required'],
        trim: true,
    },

    saveImage: [{
        type: ObjectId,
        ref: "Post",
    }],

    addToCollection: [{
        type: ObjectId,
        ref: "Post",
    }],

    email: {
        type: String,
        required: [true, 'Email is Required'],
        trim: true,
    },

    photoURL: {
        type: String,
        required: [true, 'Profile Email is Required'],
    },

    status: {
        type: String,
        default: 'active',
        enum: {
            values: ['active', 'block', 'in-active'],
            message: "Status value can't be {VALUE}, must be active/block/in-active"
        }
    },

    role: {
        type: String,
        default: 'user',
        enum: {
            values: ['user', 'admin'],
            message: "Role value can't be {VALUE}, must be user/admin"
        }
    },

    signInCount: {
        type: Number,
        default: 0,
    },

    imagePost: [{
        type: ObjectId,
        ref: "Post",
    }],

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
}, { timestamps: true });


const user = mongoose.model('User', userSchema);


module.exports = user;