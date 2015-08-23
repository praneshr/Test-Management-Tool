var path = require('path');
var config = require('./setup-config');
var Express = require('express');
var request = require('request');
var param = require('node-qs-serialization').param;
var app = Express();
var remoteServer = config.host+':'+config.port;
app.use(Express.static('build'));

app.get('/analytics/*',function(reg, res){
  var param = reg.query.projectName;
  request(remoteServer+config.getAnalytics+'?project='+param,function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.send(body)
    }else{
      console.log('error');
    }
  })
});
app.get('/tags',function(reg, res){
  request(remoteServer+config.getTags,function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.send(body)
    }else{
      console.log('error');
    }
  })
});
app.post('/create',function(reg, res){
  var tag = decodeURI(param({tag:reg.body.tag})).split('[]').join('');
  var options = {
    url: remoteServer+config.createTestCase,
    form: "testTitle="+ reg.body.title + "&testDescription="+ reg.body.description +"&"+tag
  };
  request.post(options,function(error, response, body){
    if (!error && response.statusCode == 200) {
      res.send(body)
    }else{
      console.log('error');
    }
  })
});
app.get('/*' , function(req, res){
  var file = path.join(__dirname, '/build', 'index.html');
  res.sendFile(file);
});




app.listen(9090, function () {
  console.log('http://localhost:9090');
});
