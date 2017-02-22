var app = require ('express')();
var bodyParser = require ("body-parser")
var fs = require ('fs')

var port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));

var players = fs.readFileSync('leaderboard.json');
var jsonstring = JSON.parse(players);

app.get('/users/:id', function (req, res){
  var id = req.params.id;
  for (var i = 0; i < jsonstring.length; i++){
    if(id==jsonstring[i].id){
      var stats = {
        "name": jsonstring[i].name,
        "score": jsonstring[i].score
      };
        res.send(JSON.stringify(stats));
    }
  }
});

app.post('/users/:id', function(req, res){
  var id = req.params.id;
  newscore = req.body.score;
  var newjson = jsonstring;

  for(var i = 0; i < jsonstring.length; i++){
    if(id == jsonstring[i].id){
      newjson[i].score = newscore;
    }
  }
  fs.writeFileSync('leaderboard.json', JSON.stringify(newjson));
  res.send(newjson);
});

app.get('/leaderboard/:id', function (req, res){
  var id = req.params.id;
  for (var i = 0;i < jsonstring.length; i ++){
    if(id==jsonstring[i].id){
      var position = {
      "position": jsonstring[i].position
      }
    }
  }
  res.send(JSON.stringify(position));
});

app.get('/leaderboard', function (req, res){
  var pageSize = req.query.pageSize;
  var page = req.query.page;
  if(pageSize == 1){
  res.send(jsonstring);
  }
  if(pageSize == 2 && page ==1){
      res.send(JSON.stringify(jsonstring [0])+ " "+ JSON.stringify(jsonstring[1]) + " " + JSON.stringify(jsonstring[2]))
    }else {
      if(pageSize == 2 && page == 2){
        res.send(JSON.stringify(jsonstring[3]) + " " + JSON.stringify(jsonstring[4]))
      }
  }
  if(pageSize > 2){
    res.send("No hay mas jugadores registrados actualmente")
  }
});

app.listen(port, function(){
  console.log('Listening on port 3000');
});
