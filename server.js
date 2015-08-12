var path = require('path');
var Express = require('express');
var app = Express();

app.use(Express.static('build'));

app.get('/*' , function(req, res){
  var file = path.join(__dirname, '/build', 'index.html');
  console.log(res);
  res.sendFile(file);

});




app.listen(3000, function () {
  console.log('http://localhost:3000');
});