// Express
var express = require('express');

var app = express();

// Set port
app.set('port', process.env.PORT || 8080);


// For the landing page
app.get('/', function(req, res) {
    res.send("Hi! This is just a small timestamp microservice app. Input a unix or natural-language date as a URL parameter.");
});

app.get('/:date', function(req, res) {
	var naturalDate = null, unixDate = null;
	// if in unix time already
	if (req.params.date == new Date(parseInt(req.params.date)).getTime()) {
		unixDate = parseInt(req.params.date);
		naturalDate = new Date(req.params.date * 1000).toString();
	// if in readable time
	} else if (new Date(req.params.date).getTime() > 0) {
		unixDate = new Date(req.params.date).getTime() / 1000;
		naturalDate = req.params.date;
	}
    res.json({ unix: unixDate, natural: naturalDate });
});

app.listen(app.get('port'), function() {
 console.log('Server started on localhost:' + app.get('port') + '; Press Ctrl-C to terminate.');
});