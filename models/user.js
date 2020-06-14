const mongo = require("../schemas");
const core = require("../core");

const getUserByHandle = (handle) => {
    return mongo.User.findOne({
        handle
    });
}

const register = async ({name, handle, password}) => {
    let passwordHash = core.hash.encode.bcrypt(password);
    return mongo.User.insert({
        name,
        handle,
        password: passwordHash
    })
}

module.exports = {
    getUserByHandle,
    register
}