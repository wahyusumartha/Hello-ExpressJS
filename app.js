
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Hard code alert event 
var events = [	
								{'id': 1, 'name' : 'Gita gutawa', 'message': 'Please someone rapped me', 'priority': 1},
								{'id': 2, 'name' : 'Derby Romero', 'message': 'Fired in the hole', 'priority': 1 },
								{'id': 3, 'name' : 'Yoze hariando', 'message' : 'Please help me', 'priority': 1},
								{'id': 4, 'name' : 'Ryan Dahl', 'message': 'I am starving here', 'priority' : 1},
								{'id': 5, 'name' : 'Wahyu Sumartha', 'message': 'please send plane here', 'priority' : 1}
						];


// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'SOS Alerts!'
  });
});

function loadEvent(req, res, next){
	events.find(req.params.id, function(err, ev){
		if(!events) return next(new Error('failed to load user'));
		req.events = ev;
		next();
	});
}


app.get('/events', function(req, res){
	res.render('events', { 
		title: 'SOS Alerts!',
		events: events
	});
});	

app.get('/events/:id', function(req,res){
	//res.send('Alert : ' + events[req.params.id]);
	res.render('events/show', {
			title:'SOS Alerts!',
			event: events[req.params.id - 1]
	});
});

app.get('/events/edit/:id', function(req,res){
	res.render('events/edit', {
			title: 'SOS Alerts!',
			event: events[req.params.id - 1]
	});
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
