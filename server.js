const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

// Connect to database
// Note: calling `db.collection('quotes')` later in the code automatically creates a new collection
MongoClient.connect('mongodb://db/quotebook', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port 3000...')
  })
})

// Initialize server
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// GET /: When users view the homepage, we show them a list of quotes
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})

// POST /quotes: When users post to /quotes, we add a new quote to the database
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('Saved new quote to database!')
    res.redirect('/')
  })
})

// PUT /quotes: When users put to /quotes, we update the last andy quote to one by twd
app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'andy'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// DELETE /quotes: When users delete to /quotes, we delete the last twd quote
app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('A twd quote got deleted!')
  })
})
