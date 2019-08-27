// Module Imports
var express = require("express"),
    session = require("express-session"),
    expressNunjucks = require("express-nunjucks"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    config = require("./config.json"),
    shuffle = require("shuffle-array");

// Setup Express App
var app = express();

// Configure Templating Engine
var njk = expressNunjucks(app, {
    watch: true,
    noCache: true
});

// Configure Express App
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/pub"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: config.app.secret,
    resave: false,
    saveUninitialized: false
}));

// Session Local Variables
app.get("*", function(req, res, next) {
    res.locals = req.session;
    next();
});

// Render Game
app.get("/", function(req, res) {
    res.render("index");
});

// Handle Error 404s
app.get("*", function(req, res) {
    res.redirect("/");
});

// Generate Game Object
app.post("/start/", function(req, res) {
    var set = [],
        runs = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
        suits = ["clubs", "diamonds", "hearts", "spades"];

    for (var suit of suits) {
        for (var run of runs) {
            var value;
            if (!isNaN(parseInt(run))) {
                value = parseInt(run);
            }
            else if (run === "A") {
                value = 1;
            }
            else if (run === "J") {
                value = 11;
            }
            else if (run === "Q") {
                value = 12;
            }
            else if (run === "K") {
                value = 13;
            }
            var path = "/img/" + suit + "/" + run + ".png";
            set.push({
                suit: suit,
                run: run,
                value: value,
                path: path
            });
        }
    }
    shuffle(set);
    req.session.original = set;
    req.session.sequence = set;
    var start = req.session.sequence[0];
    req.session.sequence.shift();
    res.send(start);
});

// Accept User Inputs
app.post("/guess/", function(req, res) {
    var result = req.session.sequence[0];
    req.session.sequence.shift();
    res.send(result);
});

// Run Server
var server = app.listen(config.app.port, function() {
    // Send Startup Message to Console
    console.log("Application Running - Port " + config.app.port);
});