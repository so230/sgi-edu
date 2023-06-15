var express = require('express');
const fs = require('fs');
const { exec} = require('child_process');
require('dotenv').config();

var app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // support encoded bodies

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
//git webhoook api test
app.post('/webhook/master/push', function(req,res){
  
  const payload = JSON.parse(req.body.payload);
  console.log(payload.ref);
  const pathShell = "refs/heads/master" == payload.ref ? 'sh /home/ec2-user/apps/sgi-edu/cd/prod_cd.sh' : 'sh /home/ec2-user/apps/test/sgi-edu/cd/dev_cd.sh';
  if(payload.ref == "refs/heads/master" || payload.ref == "refs/heads/develop"){
    exec(pathShell, (error, stdout, stderr) => {
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
    res.send("ci/cd를 실행합니다."); 
  }
});

app.get('/getHost',function(req, res) {
  console.log('podIP:',process.env.MY_NODE_NAME);
  res.send(process.env.MY_NODE_NAME); 
});

// WAF TEST path admin
app.get('/admin', function(req, res){
  res.render('pages/admin');
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