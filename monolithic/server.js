var express = require('express');
const fs = require('fs');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// member page
app.get('/member', function(req, res) {
    
  const jsonFile = fs.readFileSync('./members.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);

  res.render('pages/member', {'members': jsonData.members});
});

// company page
app.get('/company', function(req, res) {
    
  const jsonFile = fs.readFileSync('./company.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);

    res.render('pages/company', {'companys': jsonData.companys});
});

  
app.listen(8080);
console.log('Server is listening on port 8080');