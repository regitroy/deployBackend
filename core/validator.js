const filter = require('validator');
const resGen = require('./resgen');

function genderFilter(value) {
    if (value === "male" || value === "female" || value === "transgender") {
        return true;
    }
    return false;
}

function alphaNumeric(value){
    let re = new RegExp("^([a-z0-9]{5,})$");
    if(re.test(value))
        return true;
    else
        return false;
}

let getRegex = (type) => {
    switch(type) {
        case "name":
            return /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/g;
        case "mobile":
            return /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;
    }
}

function filterData(key, value) {
    switch (key) {
        case "string":
            // var re = /^[A-Za-z\d\s _.]+$/;
            // return re.test(value);
            return (value.length >= 1);;
        case "name":
            return getRegex("name").test(value);
        case "mobile":
            return getRegex("mobile").test(value);
        case "username" : 
            var re = /^[A-Za-z\d\s_.]+$/;
            if(value.length < 3){
                return false;
            }
            return re.test(value);
        case "number":
            return filter.isNumeric(value);
        case "character":
            return filter.isAlpha(value);
        case "cordinate":
            return filter.isFloat(value);
        case "email":
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        case "gender":
            return genderFilter(value);
        case "date":
            return (filter.toDate(value) !== null);
        case "url":
            return filter.isURL(value);
        case "password":
            return (value.length >= 6);
        case "alphaNumeric" :
            return alphaNumeric(value);
        case "mongo":
            return true;
    }
}

function getValidate(need, data, res) {
    var required = Object.keys(need);
    var given = Object.keys(data);
    var r = {}; // <- need
    var g = {}; // <- data
    for (i = 0; i < required.length; i++) {
        r[required[i]] = eval("need." + required[i]);
    }
    for (i = 0; i < given.length; i++) {
        g[given[i]] = eval("data." + given[i]).toString();
    }
    for (i = 0; i < required.length; i++) {
        if(typeof r[required[i]] == 'object'){
            if(!getValidate(r[required[i]], data[required[i]], res)){
                return false;
            }
        }
        if(typeof r[required[i]] == 'array'){
            for(let el of r[required[i]])
                if(!getValidate(el, data[required[i]], res)){
                    return false;
                }
        }
        var options = r[required[i]].split("_");
        var optional = options[1];
        let val = g[required[i]];
        if (optional) {
            if (!val)
                continue;
        }
        if (!val) {
            resGen.err(res, required[i]+" missed by you.");
            return false;
        }
        if (!filterData(options[0], val)) {
            resGen.err(res, val + " was not a valid " + options[0] + ".");
            return false;
        }
    }
    return true;
}

var validator = {
    validate: function(need, data, res) {
        let recieved = data.body;
        return getValidate(need, recieved, res);
    },
    validateGet: function(need, data, res) {
        let recieved = data.query;
        return getValidate(need, recieved, res);
    },
    validateParam: function(need, data, res) {
        let recieved = data.params;
        return getValidate(need, recieved, res);
    }
};
module.exports = validator;