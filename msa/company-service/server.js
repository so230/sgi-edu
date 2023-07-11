var express = require('express');
const fs = require('fs');
const { exec} = require('child_process');
const cors = require('cors');
const { Kafka } = require('kafkajs')

var app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true })); // support encoded bodies


// set the view engine to ejs
app.set('view engine', 'ejs');

const brokersEndpoint = 'b-2.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9094,b-3.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9094,b-1.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9094';
const kafka = new Kafka({
  clientId: 'company',
  brokers: brokersEndpoint.split(','),
  ssl: true,
  // sasl: {
  //   mechanism: 'SCRAM-SHA-512', // scram-sha-256 or scram-sha-512
  //   username: 'alice',
  //   password: 'alice-secret'
  // },

  // ssl: true,
  // sasl: {
  //   mechanism: 'aws',
  //   authorizationIdentity: 'arn:aws:iam::261243772911:user/dev1', // UserId or RoleId
  //   accessKeyId: 'AKIATZU2XT7X6ELUKFK7',
  //   secretAccessKey: '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',
  // },
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'resultCompanyGroupId' })

// company page
app.get('/company/rollback/:id', function(req, res) {
  let { id } = req.params;
  rollbackTxCompany(id);
  return;
});

app.get('/company/commit/:id', function(req, res) {
  let { id } = req.params;
  commitTxCompany(id);
  return;
});

// company page
app.get('/company/list', function(req, res) {
  const companys = getCompanys();
  console.log(companys);
  res.json({'companys': companys});
});

app.post('/company/:id/:name', async function(req, res){
  let { id, name } = req.params;
  // 업데이트전에 원래 값을 가지고 온다.
  let orgComapny = getCompany(id);
  // 업데이트 이전에 원래 값을 로그에 저장 한다.
  addCompanyTxlog(orgComapny);

  // 데이터 업데이트
  res.json({'companys': updateCompanyName(id, name, "updating")});

  await producer.connect();
  await producer.send({
    topic: 'companyUpdate',
    messages: [
      {value:JSON.stringify({ id, name, orgName: orgComapny.name })},
    ],
  });

  await consumer.connect()
  await consumer.subscribe({ topic: 'companyResult', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })

      const command = message.value.toString().split(':')[0];
      const id = message.value.toString().split(':')[1];

      if(command == "commit"){
        commitTxCompany(id)
      }
      else{
        rollbackTxCompany(id);
      }
    },
  })
});

function getCompany(id){
  const jsonFile = fs.readFileSync('./company.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);

  return jsonData.companys.find(
    function(data){ return data.id == id }
  );
}

function getCompanys(){  
  const jsonFile = fs.readFileSync('./company.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  return jsonData.companys;
}

function updateCompanyName(id, name, state){
  const jsonFile = fs.readFileSync('./company.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  
  // jsonData.companys.map((n) => (n.id == id) ? name : n.name); 
  jsonData.companys.map( function(n){
      if(n.id == id){
        if(name) 
          n.name = name;
        n.state = state;
      } 
      else{
        n;
      }
  }); 
  
  console.log(jsonData);
  const wFs = fs.writeFileSync('./company.json', JSON.stringify(jsonData));
  return jsonData.companys;
}

function addCompanyTxlog(company)
{
  const jsonFile = fs.readFileSync('./company_log.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  jsonData.push({...company, timestamp:Date.now()});
  const wFs = fs.writeFileSync('./company_log.json', JSON.stringify(jsonData));
}

function rollbackTxCompany(id){
  const jsonFile = fs.readFileSync('./company_log.json', 'utf8');
  const jsonData = JSON.parse(jsonFile);
  const logCompany = jsonData.findLast(
    function(data){ return data.id == id }
  );
  console.log(logCompany);
  updateCompanyName(id, logCompany.name, "rollback");
}

function commitTxCompany(id)
{
  updateCompanyName(id, null, "completed");
}
  


app.listen(8081);
console.log('Server is listening on port 8080');