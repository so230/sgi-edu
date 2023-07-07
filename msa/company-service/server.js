var express = require('express');
const fs = require('fs');
const { exec} = require('child_process');
const cors = require('cors');
const { Kafka } = require('kafkajs')

var app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true })); // support encoded bodies
const {
  createMechanism,
} = require("@jm18457/kafkajs-msk-iam-authentication-mechanism");

// set the view engine to ejs
app.set('view engine', 'ejs');
const brokersEndpoint = 'b-2.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9096,b-1.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9096,b-3.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9096';
// use res.render to load up an ejs view file
const kafka = new Kafka({
  clientId: 'company',
  brokers: brokersEndpoint.split(','),
  ssl: true,
  sasl: {
    mechanism: 'SCRAM-SHA-512', // scram-sha-256 or scram-sha-512
    username: 'alice',
    password: 'alice-secret'
  },

  // ssl: true,
  // sasl: {
  //   mechanism: 'aws',
  //   authorizationIdentity: 'arn:aws:iam::261243772911:user/dev1', // UserId or RoleId
  //   accessKeyId: 'AKIATZU2XT7X6ELUKFK7',
  //   secretAccessKey: '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',
  // },
})

const producer = kafka.producer()

// company page
app.get('/company/list', function(req, res) {
    
  const companys = getCompanys();
  console.log(companys);
  res.json({'companys': companys});
});

app.post('/company/:id/:name', async function(req, res){
  let { id, name } = req.params;
  console.log(id, name);
  
  res.json({'companys': updateCompanyName(id, name)});
  await producer.connect();
  await producer.send({
    topic: 'customerTopic',
    messages: [
      {value:{ id, name }},
    ],
  });
});

function getCompanys(){  
  const jsonFile = fs.readFileSync('./company.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  return jsonData.companys;
}

function updateCompanyName(id, name){
  const jsonFile = fs.readFileSync('./company.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  
  // jsonData.companys.map((n) => (n.id == id) ? name : n.name); 
  jsonData.companys.map( n => n.id == id ? n.name = name : n); 
  
  console.log(jsonData);
  const wFs = fs.writeFileSync('./company.json', JSON.stringify(jsonData));
  return jsonData.companys;

}
  
app.listen(8080);
console.log('Server is listening on port 8080');