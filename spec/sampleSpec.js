// spec/sampleSpec.js

var express = require('express');
var passport = require('passport');

describe("sample", function() {
    it("should work everytime", function () {
    });
});

describe("express", function() {
    it("should create an app", function() {
        var app = express();
        expect(app).toBeDefined();
    });

    it("should create a router", function() {
        var router = express.router;
        expect(router).toBeUndefined();
    });
});

describe("passport", function() {
    it("should initialize passport", function() {
        var pp = passport.initialize();
        expect(pp).toBeDefined();
    });
    it("should create passport session", function() {
        var ses = passport.session();
        expect(ses).toBeDefined();
    });
});


