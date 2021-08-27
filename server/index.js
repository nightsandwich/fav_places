

const express = require('express');
const { static } = express;
const volleyball = require('volleyball');
const path = require('path');

const app = express();

app.use(volleyball);

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/dist', static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')))

//start of the routes - request comes in from the top and hits each of the above lines
//
app.use('/api', require('./api'));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, '..', 'src', 'index.html')));

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

  module.exports = app;