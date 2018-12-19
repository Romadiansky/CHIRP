"use strict";

const userHelper = require("../lib/util/user-helper")

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {

// serves index with tweets from db
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

// accepts a new tweet submition via a form
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      icon1: 0,
      icon2: 0,
      icon3: 0,
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  // accepts a new tweet vote
  tweetsRoutes.post("/vote", function(req, res) {
    DataHelpers.updateTweet(req.body, (err, result) => {
      if (err) {
        res.status(500).json({error: err.message});
      } else {
        res.json(result);
      }
    });
  });

  return tweetsRoutes;

}
