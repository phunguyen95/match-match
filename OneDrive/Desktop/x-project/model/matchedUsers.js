const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchedUsers = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    age: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    photo: [
        {
            type: String
        }
    ],
    jobs: [
        {
            company: {
                type: string
            },
            title: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = Post = mongoose.model("matchedUsers", matchedUsers);
