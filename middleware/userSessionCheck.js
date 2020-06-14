const hash = require("../core/hash");
const config = require("../configs");

module.exports = function(req, res, next) {
    if(!req.headers.token){
        res.json({sucess: 0, msg: 'Need user authentication.'});
        return;
    }
    const token = req.headers.token;
    if(!hash.decode.jwt.isValid(token, config.jwt.key)){
        res.json({sucess: 0, msg: 'Need re-authentication.'});
        return;
    }
    const tokenData = hash.decode.jwt.getData(token);
    req.user = {
        _id: tokenData.userId
    }
    next();
}