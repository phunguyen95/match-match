const request = require("request");
const express = require("express");
const isEmpty = require("../../utils/helper");
const Users = require("../../model/users");
const router = express.Router();
const options = {
    url: "https://api.gotinder.com/v2/profile?locale=en&include=user",
    headers: {
        "user-session-id": "1641b789-b2f1-40bf-a717-bc2228ae31cd",
        platform: "web",
        "x-auth-token": "1ff0a969-b19f-412a-801a-248d8d7fcc1a",
        "tinder-version": "2.45.0",
        "sec-fetch-mode": "cors",
        "persistent-device-id": "e2c14e6b-172d-44d2-8128-ee28f36460cf",
        "sec-fetch-site": "cross-site",
        accept: "application/json"
    },
    method: "Get"
};
function callback(error, response, body) {
    console.log("callback");
    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        const userInfo = info.data.user;
        console.log("userInfo", userInfo);
        if (!isEmpty(userInfo)) {
            Users.findOne({ id: userInfo._id }).then((user) => {
                if (user) {
                    console.log("already exists");
                } else {
                    console.log("here");
                    const newUser = new Users({
                        name: userInfo.name,
                        id: userInfo._id,
                        bio: userInfo.bio,
                        birthday: userInfo.birth_date,
                        photos: userInfo.photos
                    });
                    newUser
                        .save()
                        .then((savedUser) => {
                            console.log("savedUser", savedUser);
                            return savedUser;
                        })
                        .catch((err) => console.log(err));
                }
            });
        }
    }
}
router.get("/profile", (req, res) => {
    console.log("profile route");
    const user = request(options, callback);
    console.log("user", user);
    res.json({ user });
});
module.exports = router;
