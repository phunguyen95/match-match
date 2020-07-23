const request = require("request");
const moment = require("moment");
const isEmpty = require("../../utils/helper");
const LikedUsers = require("../../model/likedUsers");
const options = {
    url: "https://api.gotinder.com/v2/recs/core?locale=en",
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
    console.log("request start");

    if (!error && response.statusCode == 200) {
        const info = JSON.parse(body);
        const { results } = info.data;
        results.map((userInfo, index) => {
            const { user } = userInfo;
            if (
                !isEmpty(user.jobs) &&
                user.bio.length > 10 &&
                user.photos.length > 2
            ) {
                console.log("hash content", userInfo.content_hash);
                const signatureNumber = user.s_number;
                const likedUser = new LikedUsers({
                    name: user.name,
                    bio: user.bio,
                    age: calculateAge(user.birth_date),
                    photos: userInfo.photos,
                    schools: user.schools,
                    jobs: user.jobs,
                    distance: userInfo.distance_mi
                });
                likedUser
                    .save()
                    .then((likedUser) => {
                        return likedUser;
                    })
                    .catch((err) => console.log(err));
            }
        });
    }
    request(options, callback); //retry
}
function calculateAge(birthday) {
    let age = moment().diff(birthday, "years", false);
    return age;
}
request(options, callback);
