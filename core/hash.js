const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

module.exports = {
    encode: {
        bcrypt: (password) => {
            return bcrypt.hashSync(password, 4);
        },
        jwt: (data, key) => {
            return jwt.sign(data, key);
        },
        md5: (msg) => {
            return crypto.createHash('md5').update(msg).digest("hex")
        }
    },
    decode: {
        bcrypt: (password, hash) => {
            return bcrypt.compareSync(password, hash);
        },
        jwt: {
            isValid: (token, key) => {
                try {
                    let decoded = jwt.verify(token, key);
                    return true;
                } catch(err) {
                    return false;
                }
            },
            getData: (token) => {
                return jwt.decode(token);
            },
            getInfo: (token) => {
                return jwt.decode(token);
            }
        }
    }
}