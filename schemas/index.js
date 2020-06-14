const model = require("../core/db/model");

module.exports = {
    User: model.init('users'),
    Deployment: model.init('deployments'),
    Histories: model.init('histories')
}