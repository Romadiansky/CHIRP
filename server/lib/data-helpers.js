"use strict";
const ObjectId = require("mongodb").ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet);
      callback(null, true);
    },

    // Updates a tweet by incrementing the correct vote
    updateTweet: function(obj, callback) {
      db.collection('tweets').findAndModify(
        { _id: new ObjectId(obj.id) },
        [['_id','asc']],
        { $inc: {[obj.icon]: 1} },
        {new: true},
        callback
      );
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      // const sortNewestFirst = (a, b) => a.created_at - b.created_at;

      db.collection('tweets').find().toArray((err, results) => {
        if (err) {
          return callback(err);
        } else {
          callback(null, results);
        }
      });
    }

  };
}