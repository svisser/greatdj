var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var app = express();
var geoip = require('geoip-lite');
var db, playlist = {};

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
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if(req.body.id){
    // update
    db.collection('playlists').findOne({id: req.body.id}, function(err, obj){
      if(obj && obj.ip === ip){
        playlist.update(req.body.id, req.body, res);
      } else {
        var data = req.body;
        data.ip = ip;
        playlist.insert(data, res);
      }
    });

  } else {
    // insert new record
    var data = req.body;
    data.ip = ip;
    playlist.insert(data, res);
  }
})

app.get('/p', function(req, res){
  var collection = db.collection('playlists');

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
});

// playlist controllers controllers - get them out of here some day
playlist.insert = function(data, res){
  var id = Math.random().toString(36).slice(3,9); // revisit
  var geo = geoip.lookup(data.ip);

  var doc = {id: id, playlist: data.playlist, ip: data.ip, geo: geo, created: new Date()};

  db.collection('playlists').insert(doc, {w:1}, function(err, result) {
    console.log('insert ok ', id);
    res.send({operation: 'insert', id: id});
  });
};

playlist.update = function(id, data, res){
  db.collection('playlists').update({id: id}, {$set:{playlist: data.playlist}}, {w:1}, function(err, result) {
    console.log('update ok ', id);
    res.send({operation: 'update', id: id});
  });
};

