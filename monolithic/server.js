var express = require('express');
const fs = require('fs');
const { exec} = require('child_process');


var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

//git webhoook api
app.get('/webhook/master/push', function(req,res){
  exec("ls -al", (error, stdout, stderr) => {

    if(error){
      console.log(`error: ${error.message}`);
      return;
    }

    if(stderr){
      console.log(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  })
  exec("");
  exec("");
  exec("");
  exec("");
  exec("");
  res.send("ci/cd를 실행합니다.");
});

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