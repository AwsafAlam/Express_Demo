// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/playground')
//         .then(() => console.log('Connected to MongoDB...'))
//         .catch(err => console.error('Could not connect to Mongo',err))

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Awsaf:kolpoBD@15@clusterdemo0-1pdvg.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('Could not connect',err);
  client.close();
});
