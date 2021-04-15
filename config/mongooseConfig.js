const mongoose = require('mongoose');
const uri = "mongodb://shivam:RV2kzFibgeW2gOHY@clusteralpha-shard-00-00.hftvx.mongodb.net:27017,clusteralpha-shard-00-01.hftvx.mongodb.net:27017,clusteralpha-shard-00-02.hftvx.mongodb.net:27017/majorProject?ssl=true&replicaSet=atlas-o0jyay-shard-0&authSource=admin&retryWrites=true&w=majority"

try{
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
}catch(e){
    console.log("Error connecting to db atlas");
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Sucessfully connected to db ");
});



// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



