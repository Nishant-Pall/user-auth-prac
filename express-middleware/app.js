const express = require("express");

const app = express();

function middleware1(req, res, next) {
    console.log("I am a middleware1");
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

// use middleware globally
// only get executed when we execute the get route
// app.use() doesnt execute them
// it just adds them into the chain of executed middlewares
app.use(middleware1);
app.use(middleware2);

app.get("/", (req, res, next) => {
    console.log("I am a standard callback");
    res.send(`${req.customProperty}`);
});

app.use(errorHandler);
app.listen(3000);
