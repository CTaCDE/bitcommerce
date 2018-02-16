// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const mongodb = require('mongodb');
const express = require('express');
const app = express();
const nconf = require('nconf');
var path = require('path');

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file('keys.json');

// Connect to a MongoDB server provisioned over at
// MongoLab. See the README for more info.
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);

mongodb.MongoClient.connect(uri, function(err, db) {
    // Attempt to connect to the MongoDB server on mLab
    if (err) {
        throw err;
    } else {
        console.log("connected");
    }

// Sort and print all documents from tshirts collection to console
var dbo = db.db('items');   // database is called items in mLab
var mysort = { itemid: 1 }; // sort by itemid in ascending order

dbo.collection("tshirts").find().sort(mysort).toArray(function(err, result) {
    if (err) {
        throw err;
    }
    console.log(result);
console.log("end of app.js");
/*
    console.log("Item 1: ");
    console.log(result[0].name);
    console.log(result[0].description);
    console.log("\n");

    console.log("Item 2: ")
    console.log(result[1].name);
    console.log(result[1].description);
    console.log("\n");
*/

    db.close();
});

// Previous testing code to print all items in tshirt collection
/*
dbo.collection("tshirts").find({}).toArray(function(err, result) {
    if (err) {
        throw err;
    }
    console.log(result);
    db.close();
});
*/
    // Load the html/css/js files
    app.get('/', function(req, res){
        res.sendFile('index.html', { root: __dirname + "/public/html" } );
    });

    // Use the public folder for resource files
    app.use(express.static("public"));

    // Start the server with Express.js
    if (module === require.main) {
        // [START server]
        const server = app.listen(process.env.PORT || 8080, () => {
        const port = server.address().port;
            console.log(`App listening on port ${port}`);
        });
        // [END server]
    }
});

module.exports = app;

