let async = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
}

module.exports = {
    async,
    db: require('./db'),
    rg: require('./resgen'),
    validator: require('./validator'),
    hash: require('./hash')
}