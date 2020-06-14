module.exports = {
    suc: (res, data) => {
        if (data == null) {
            data = {};
        }
        res.status(200).json({success: 1, data});
    },
    err: (res, err) => {
        if (err.message) {
            err = err.message;
        }
        res.status(200).json({ success: 0, message: err });
    },
    error: (msg) => {
        throw new Error(msg);
    }
};