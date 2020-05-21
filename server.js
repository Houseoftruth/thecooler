const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');


const app = express()


//MIDDLEWARE//
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())

//MIDDLEWARE//


const beer = require('./routes/api/beer')

app.use('/api/beer', beer)

const port = process.env.PORT || 5000;

module.exports = app.listen(port, () => console.log(`Server started on port ${port}`));

