const q = require('q');
const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    storeModel = [];
const random = require('mongoose-simple-random');
const uniqueValidator = require('mongoose-unique-validator');

let getDbSchema = (collection) => {
    if (storeModel[collection]) {
        return storeModel[collection];
    }
    let dbSchema = require("../../schemas/" + collection);
    dbSchema.update_date = {
        type: Date,
        default: Date,
        select: true
    };
    dbSchema.create_date = {
        type: Date,
        default: Date,
        select: true
    };
    let schema = new Schema(dbSchema, { collection: collection });
    schema.plugin(uniqueValidator);
    schema.plugin(random);
    schema.pre('save', function (next) {
        let currentDate = new Date();
        this.update_date = currentDate;
        this.create_date = currentDate;
        next();
    });
    let model = mongoose.model(collection, schema);
    storeModel[collection] = model;
    return model;
}

module.exports = {
    init: (collection) => {
        let schema = getDbSchema(collection);
        return {
            find: function (option) {
                let deferred = q.defer();
                schema.find(option).exec(function (err, docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findAll: function (option, sortby, limit, skip, slice) {
                let s = {};
                if (slice)
                    s = slice;
                
                let deferred = q.defer();
                schema.find(option, s).sort(sortby).limit(Number(limit)).skip(Number(skip)).exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                    }
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findAllRandom: function (option, sortby, limit, skip) {
                
                let deferred = q.defer();
                if (!skip) {
                    skip = 0;
                }
                schema.findRandom(option, sortby, { limit: limit, skip: skip }, function (err, docs) {
                    if (err) {
                        console.log(err);
                    }
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            count: function (option) {
                
                let deferred = q.defer();
                schema.count(option, function (err, docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findById: function (id) {
                
                let objectId = mongoose.Types.ObjectId(id);
                let deferred = q.defer();
                schema.findOne({ "_id": objectId }, function (err, docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findOne: function (option) {
                
                let deferred = q.defer();
                schema.findOne(option, function (err, docs) {
                    if (err)
                        console.log(err);
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findOneByPopulate: function (populate, option) {
                
                let deferred = q.defer();
                for (let i = 0; i < populate.length; i++) {
                    console.log(populate[i]);
                    schema.populate(populate[i]);
                }
                schema.findOne(option, function (err, docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findByJoin: function (populate, options) {
                
                let deferred = q.defer();
                schema.find(options).populate(populate).exec(function (err, docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findOneWithEx: function (option, ex) {
                
                let deferred = q.defer();
                schema.findOne(option).select(ex).exec().then(function (docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findAllWithEx: function (option, ex, sortby, limit, skip) {
                
                let deferred = q.defer();
                schema.find(option).select(ex).sort(sortby).limit(limit).skip(skip).exec().then(function (docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            insert: function (docs) {
                
                let sch = new schema(docs);
                let deferred = q.defer();
                sch.save(function (err, docs) {
                    if (err)
                        console.log(err);
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            insertMany: function (docs) {
                
                let sch = new schema(docs);
                let deferred = q.defer();
                schema.insertMany(docs, function (err, d) {
                    if (err)
                        console.log(err);
                    deferred.resolve(d);
                });
                return deferred.promise;
            },
            update: function (option, docs, ops = {}) {
                docs = {...docs, ...ops};
                let deferred = q.defer();
                docs.update_date = new Date();
                schema.findOneAndUpdate(option, docs, function (err, retDocs) {
                    if (err)
                        console.log(err);
                    deferred.resolve(retDocs);
                });
                return deferred.promise;
            },
            updateAll: function (option, docs) {
                
                let deferred = q.defer();
                docs.update_date = new Date();
                schema.update(option, {$set: docs}, { "multi": true }, function (err, docs) {
                    if (err)
                        console.log(err);
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            updateById: function (id, data) {
                
                let deferred = q.defer();
                schema.findOneAndUpdate({ _id: id }, {$set: data}, function (err, docs) {
                    if(err){
                        console.log(err);
                    }
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            delete: function (options) {
                
                let deferred = q.defer();
                schema.findOneAndRemove(options, function (err, docs) {
                    if (err)
                        console.log(err);
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            deleteAll: function (options) {
                
                let deferred = q.defer();
                schema.remove(options, function (err, docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            deleteById: function (_id) {
                
                let objectId = mongoose.Types.ObjectId(_id);
                let deferred = q.defer();
                schema.findOneAndRemove({ "_id": objectId }, function (err, docs) {
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            findOneAndUpdate: (query, update) => {
                let options = { upsert: true, new: true, setDefaultsOnInsert: true };
                
                let deferred = q.defer();
                schema.findOneAndUpdate(query, update, options, function (err, docs) {
                    if(err){
                        console.log("ERROR -> ", err);
                    }
                    deferred.resolve(docs);
                });
                return deferred.promise;
            },
            geoNearBy: function (options) {
                let deferred = q.defer();
                console.log(options);
                let point = {
                    type: "Point",
                    coordinates: [options.lng, options.lat]
                };
                let geoOptions = {
                    spherical: true,
                    maxDistance: options.distance * 1000
                };

                schema.where(options.field).near({
                    center: point,
                    maxDistance: geoOptions.maxDistance / 6371
                }).then(function (docs) {
                    deferred.resolve(docs);
                    // console.log(docs);
                }).catch(function (error) {
                    console.log(error);
                });
                return deferred.promise;
            }
        }
    }
};