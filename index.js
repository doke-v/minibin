let MongoClient = require('mongodb').MongoClient;
let url = "Your MongoDB URL Here";




const client = new MongoClient(url, { useNewUrlParser: true })
const connection = client.connect()
    const connect = connection
    connect.then(() => {
        const db = client.db('mydb')
        const coll = db.collection('pastes')
        db.collection("pastes").find({}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
            });
    })



const shortid = require('shortid');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/count', (req, res) => {
  let id = req.params.id
   connect.then(() => {
     const db = client.db('mydb')
     const coll = db.collection('pastes') 
     coll.countDocuments(
      {}, // filters
      {}, // options
      function(error, result) {
        res.send({text: result});
      }
    );
   });
})

app.get('/drop', (req, res) => {
  let id = req.params.id
   connect.then(() => {
     const db = client.db('mydb')
     const coll = db.collection('pastes')
     
     coll.deleteMany({}, function(err, obj) {
      if (err) throw err;
      res.send({text: obj.result.n + " items(s) deleted"});
    });
   });
})

app.get('/:id', (req, res) => {
   let id = req.params.id
    connect.then(() => {
      const db = client.db('mydb')
      const coll = db.collection('pastes')
      coll.findOne({id}, function(err, result) {
        if (err) throw err;
        if(!result) {
          //console.log("not found: " + id)
          res.send({text: "Paste not found..."})
        }
        else {
          //console.log("found: " + id)
          res.send({text: result.paste})
        }
      });
      
    });

})





app.post('/', (req, res) => {
  let id = shortid.generate()
  req.body.shortid = id
  res.send(req.body)
 
  connect.then(() => {
    const db = client.db('mydb')
    const coll = db.collection('pastes')
    coll.insertOne({id, paste: req.body.text}, function(err, res) {
      if (err) throw err;
      console.log(res.result);
    });
    
  }); 
 
  

});