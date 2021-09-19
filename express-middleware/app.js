const express = require("express");

const app = express();

// use middleware globally
app.use(middleware1);
app.use(middleware2);

function middleware1(req, res, next) {
    console.log("I am a middleware");
    req.customProperty = 100;
    next();
}

function errorHandler(err, req, res, next) {
    if (err) {
        res.send("There was an error");
    }
}

function middleware2(req, res, next) {
    console.log(`${req.customProperty}`);
    req.customProperty = 700;
    next();
}

app.get("/", (req, res, next) => {
    console.log("I am a standard callback");
    res.send(`${req.customProperty}`);
});

app.use(errorHandler);
app.listen(3000);
