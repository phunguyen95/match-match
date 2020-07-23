const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    photos: [
        {
            url: {
                type: String
            }
        }
    ],
    bio: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
    }
});
module.exports = User = mongoose.model("user", userSchema);
