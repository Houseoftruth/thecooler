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

if(process.env.NODE_ENV === 'production'){

    app.use(express.static(__dirname + '/public'))

    app.get(/.*/, (req,res)=>res.sendFile(__dirname + '/public/index.html'))
}
//
// Middleware

const port = process.env.PORT || 5000;

module.exports = app.listen(port, () => console.log(`Server started on port ${port}`));

