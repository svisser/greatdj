var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var app = express();
var db;

app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/components', express.static(__dirname + '/components'));

// development only
if ('development' == app.get('env')) {
  console.log('Development mode.');

  app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
  });
}

app.post('/p', function(req, res){
  var collection = db.collection('test');

  if(req.body.id){
    // update
    collection.update({id: id}, {$set:{playlist: req.playlist}}, {w:1}, function(err, result) {
      console.log('update ok ', req.body.id)
      res.send({id: id});
    });
  } else {
    // insert new record
    var id = Math.random().toString(36).slice(12); // revisit
    var doc = {id: id, playlist: req.body.playlist, created: new Date()};

    collection.insert(doc, {w:1}, function(err, result) {
      console.log('insert ok ', id)
      res.send({id: id});
    });
  }
})

app.get('/p', function(req, res){
  var collection = db.collection('test');

  collection.findOne({id: req.query.id}, function(err, item) {
    res.send(item);
  });
});

app.get('/*', function(req, res){
  res.sendFile(__dirname + "/index.html");
});

// db - Mongo Connect
mongo.connect("mongodb://localhost/greatdj", function(err, database) {
  db = database;
  app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });
})
