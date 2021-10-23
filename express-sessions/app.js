const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');

// session store library
const MongoStore = require('connect-mongo');
const app = express();

const dbString = 'mongodb://127.0.0.1:27017/tuto';
const dbOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
	mongoUrl: dbString,
	mongoOptions: dbOptions,
	collection: 'sessions'
});

app.use(session({
	secret: "some secret",
	resave: 'false',
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24
	}
}));

app.get('/', (req, res, next) => {
	res.send(`<h1>Hello World (Sessions)</h1>`);
});

app.listen(5000, () => {
	console.log('server running');
});