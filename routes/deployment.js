const express = require("express");
const router = express.Router();
const core = require("../core");
const model = require("../models");

router.get("/", core.async(async (req, res) => {
    let deployments = await model.deployment.getDeploymentList();
    core.rg.suc(res, deployments);
}));

router.get("/history", core.async(async (req, res) => {
    let histories = await model.deployment.getHistory();
    core.rg.suc(res, histories);
}));

router.post("/", core.async(async (req, res) => {
    let need = {
        templete: 'mongo',
        version: 'string',
        url: 'url'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    let deployment = await model.deployment.getDeploymentById(req.body.templete);
    if(!deployment){
        core.rg.err(res, "Deployment not found.")
        return;
    }
    let versions = deployment.versions.filter(v => {
        return v == req.body.version
    })
    if(versions.length == 0){
        core.rg.err(res, "Version not found.")
        return;
    }

    let out = await model.deployment.createHistory({
        deploymentId: deployment._id,
        name: deployment.name,
        version: req.body.version,
        url: req.body.url
    });
    core.rg.suc(res, out);
}));

router.post("/delete", core.async(async (req, res) => {
    let need = {
        historyId: 'mongo'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    await model.deployment.deleteHistory(req.body.historyId);

    core.rg.suc(res);
}));

module.exports = router;