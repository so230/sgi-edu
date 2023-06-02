var express = require('express');
const fs = require('fs');
const { exec} = require('child_process');
const cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true })); // support encoded bodies

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file


// company page
app.get('/list', function(req, res) {
    
  const companys = getCompanys();
  console.log(companys);
  const members = getMembers();

  // res.render('pages/company', {'companys': companys, 'members':members});
  res.json({'companys': companys});
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