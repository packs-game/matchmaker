var express = require('express');
var lib = require('packs-lib');

var app = express();

var queue = lib.queue;

var bodyParser = require('body-parser');
var crossDomain = lib.crossDomain;

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(crossDomain);
var checkAuth = lib.checkAuth;

app.post('/search-game', checkAuth, function(req, res) {
	queue.send('matchmaking', {type: 'search', id: req.body.id});
	return res.sendStatus(200);
});
app.post('/cancel-search-game', checkAuth, function(req, res) {
	queue.send('matchmaking', {type: 'cancel', id: req.body.id});
	return res.sendStatus(200);
});


app.listen(3002);