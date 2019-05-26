var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://jef:mongodb1@ds247944.mlab.com:47944/crud-express-mongo-app";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("crud-express-mongo-app");
  dbo.collection("names").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});
