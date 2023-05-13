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
    
  const members = getMembers();

  res.render('pages/member', {'members': members});
});

// company page
app.get('/company', function(req, res) {
    
  const companys = getCompanys();
  console.log(companys);
  const members = getMembers();

  res.render('pages/company', {'companys': companys, 'members':members});
});


function getMembers(){  
  const jsonFile = fs.readFileSync('./members.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  return jsonData.members;
}

function getCompanys(){  
  const jsonFile = fs.readFileSync('./company.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  return jsonData.companys;
}
  
app.listen(8080);
console.log('Server is listening on port 8080');