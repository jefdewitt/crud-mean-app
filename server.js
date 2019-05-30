console.log('May Node be with you.');

const cors = require('cors');
const express = require('express');
// body-parser extracts data from form & adds it to the body property of the req object
const bodyParser= require('body-parser')
const cookieParser= require('cookie-parser')
const app = express();

app.use(cors());

// Mongo DB configs
const MongoClient = require('mongodb').MongoClient
const MongoCreds = 'mongodb://jef:mongodb1@ds247944.mlab.com:47944/crud-express-mongo-app';

let db;
MongoClient.connect(MongoCreds, { useNewUrlParser: true }, (err, client) => {

    if (err) return console.log(err)
    db = client.db('crud-express-mongo-app') // whatever your database name is

    app.listen(3000, function() {
        console.log('listening on 3000')
    });
})

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'pug');

let names = [];
app.get('/', function(req, res) {
    db.collection('names').find().toArray(function(err, results) {
        console.log(results)
        const test = req.cookies.name;
        console.log('test', test)
        names = results;
        // send HTML file populated with names here
        // res.render('index', {'names': names});

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ mongoData: names }));
    })
})

app.get('/form', function(req, res) {
    res.render('form');
})

app.post('/form-data', (req, res) => {
    console.log(req.body)
    if(req.body.name != '') {
        res.cookie('name', req.body.name);
        db.collection('names').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)

            console.log('saved to database')
            res.redirect('/')
        })
    }
})
