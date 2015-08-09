var path = require('path');
var Express = require('express');
var app = Express();

app.use(Express.static('build'));

app.get('/*' , function(req, res){
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});



app.listen(3000, function () {
  console.log('http://localhost:3000');
});