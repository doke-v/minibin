require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const shortid = require('shortid');
const express = require('express');
const app = express();
const url = process.env.MONGODB_URL;
const port = 5000;

app.use(express.json())
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

let db
let pastes

const connect = client.connect().then(()=>{
  db = client.db('mydb')
  pastes = db.collection('pastes')
})


app.listen(port, () => console.log(`Listening on port ${port}`));
app.get('/count', (req, res) => {
   connect.then(() => {
     pastes.countDocuments(
      {},
      {},
      function(error, result) {
        res.send({count: result});
      }
    );
   });
})

app.get('/drop', (req, res) => {
   connect.then(() => {
     pastes.deleteMany({}, function(err, obj) {
      if (err) throw err;
      res.send({text: obj.result.n + " items(s) deleted"});
    });
   });
})

app.get('/:id', (req, res) => {
   let id = req.params.id
    connect.then(() => {
      pastes.findOne({id}, function(err, result) {
        if (err) throw err;
        if(!result) {
          res.send({text: "Paste not found..."})
        }
        else {
          res.send({text: result.paste})
        }
      });
    });
})

app.post('/', (req, res) => {
  let id = shortid.generate()
  res.send({message: "ok", shortid: id})
  connect.then(() => {
    pastes.insertOne({id, paste: req.body.text}, function(err, res) {
      if (err) throw err;
    });
  });
});