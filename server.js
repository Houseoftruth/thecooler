const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
//var DB = require('nosql');
const validator = require('./zaid_modules/validator')
//var nosql = DB.load('/path/to/database/file.nosql');

const app = express()


//MIDDLEWARE//
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ 'extended': 'true' })); 
app.use(bodyParser.urlencoded({extended: true})); 

app.use(cors())
//app.use(validator)

//MIDDLEWARE//

const beer = require('./routes/api/beer')
//y//console.log(beer)
app.use('/api/beer', beer)


//
// Middleware

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
