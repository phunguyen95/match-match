const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likedUsers = new Schema({
    bio: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    photos: [
        {
            type: String
        }
    ],
    schools: [
        {
            name: {
                type: String
            }
        }
    ],
    jobs: [
        {
            company: {
                name: {
                    type: String
                },

                title: {
                    name: {
                        type: String
                    }
                }
            }
        }
    ],
    age: {
        type: Number
    },
    distance: {
        type: Number
    }
});
module.exports = Post = mongoose.model("likedUsers", likedUsers);
