const mongo = require("../schemas");

const getDeploymentList = () => {
    return mongo.Deployment.findAll({});
}

const getHistory = () => {
    return mongo.Histories.findAll({});
}

const getDeploymentById = (id) => {
    return mongo.Deployment.findOne({_id: id});
}

const createHistory = ({deploymentId, name, version, url}) => {
    return mongo.Histories.insert({deploymentId, name, version, url});
}

const deleteHistory = (historyId) => {
    return mongo.Histories.delete({_id: historyId});
}

module.exports = {
    getDeploymentById,
    getDeploymentList,
    createHistory,
    deleteHistory,
    getHistory
}