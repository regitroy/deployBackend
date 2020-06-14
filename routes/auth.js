const express = require("express");
const router = express.Router();
const core = require("../core");
const model = require("../models");
const config = require("../configs");

router.get("/", core.async(async (req, res) => {
    res.send("Hello world");
}));

router.post("/register", core.async(async (req, res) => {
    const need = {
        handle: 'username',
        name: 'name',
        password: 'password'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    let user = await model.user.getUserByHandle(req.body.handle);
    if(user){
        core.rg.err(res, 'Handle already taken.');
        return;
    }

    await model.user.register({
        name: req.body.name,
        handle: req.body.handle,
        password: req.body.password
    });
    core.rg.suc(res, {});
}));

router.post("/login", core.async(async (req, res) => {
    const need = {
        handle: 'username',
        password: 'password'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    let user = await model.user.getUserByHandle(req.body.handle);
    if(!user){
        core.rg.err(res, 'Handle not found.');
        return;
    }

    if(!core.hash.decode.bcrypt(req.body.password, user.password)){
        core.rg.err(res, 'Handle or password not matched.');
        return;
    }

    const token = core.hash.encode.jwt({
        userId: user._id,
        createdAt: new Date().toUTCString()
    }, config.jwt.key);

    core.rg.suc(res, {
        token,
        user: {
            name: user.name,
            handle: user.handle
        }
    })
}));

module.exports = router;