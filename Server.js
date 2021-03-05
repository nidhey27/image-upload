var express = require("express");
var multer = require('multer');
var app = express();
var imgModel = require('./image');
const mongoose = require('mongoose');
const fs = require('fs')
var path = require('path');


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
    console.log(file)
  }
});
var upload = multer({ storage: storage }).single('myfile');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get('/get', (req, res) => {
  imgModel.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.json({ items: items });
      }
  });
});

app.post('/uploadjavatpoint', function (req, res) {
  const x = upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    // // console.log(x)
    // console.log((__dirname + '/uploads/' + req.file))
    // console.log((res.file))
    res.end("File is uploaded successfully!");
  });
});

app.listen(2000, function () {
  console.log("Server is running on port 2000");
});
