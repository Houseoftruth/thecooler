const express = require('express')
const app = express();
const mongodb = require('mongodb')
const bodyParser= require('body-parser')
const router = express.Router()
const rp = require('request-promise')
var DB = require('nosql');
var nosql = DB.load('./database/fridge.nosql');
console.log(nosql)
//var db = NoSQL.load('../../database',nosql);
 
//const validator = require('../../zaid_modules/validator')
var validate = require('validate.js') 

var options = {
    uri: 'https://api.punkapi.com/v2/beers/random',
    json: true
};

//router.use(bodyParser.urlencoded({ 'extended': 'true' })); 

router.use('/:name',function (req, res, next) {
    console.log("before");
    console.log(req.params)
    var requestObject = {
        name: req.params.name,
        from: ""
    }
    

    validate.validators.myAsyncValidator = function (value) {
        return new validate.Promise(function (resolve, reject) {
            setTimeout(function () {
                if (value === "foo") resolve();
                else resolve("is not foo");
            }, 100);
        });
    };


    var constraints = {
        name: { myAsyncValidator: true },
        from: {
            email: true
        }
    }
        , success = "The validations have passed"//alert.bind(this, "The validations passed")
        , error = function (errors) {
            // console.log(JSON.stringify(errors, null, 2));
        };

    // Will call the success callback
    validate.async(req.params.name, constraints).then((input) => {

        //console.log("DFDLKFJ")
        console.log("Validator has run...")

        if (input) {
            //nosql.find().query("doc.firstname == 'firstname'").callback(console.log);
            nosql.insert({ id: 3499, age: 55, name: 'Peter' }).callback(function(err) {
                console.log('The user has been created.',err);
            });
            nosql.find().make(function(filter) {
                filter.where('age', '>', 20);                //filter.where('removed', false);
                filter.callback(function(err, response) {
                    console.log(err, response);
                });
            });           
            console.log("All validator conditions met...")
            return next()

        } 

    }).catch((error) => {
        console.log("caught")
        console.log("FALSE", error)
        res.json({ success: false, message: "Email is not valid" })
        var results = { false: "FALSE", error: error }

    }).finally((errors) => {

        console.log("FALSE")

    })
})

router.put('/', (req, res, next) => {
    console.log(req.params)
/*
    console.log(req.header("x-user"))
    console.log("line 16")
    //console.log(validatorResponse)
    rp(options)
        .then(function (data) {
            //r console.log(data)
            res.json(data)
        })

    //res.send("hello")
*/
    })

router.get('/api.punkapi.com/v2/beers/random'
    , (req, res) => {

        if (err) throw err;
        if (!res) {
            res.json({ success: false, message: "There was an error retrieving beer..." })
        } else {
            res.json({ success: true, message: "Beer has been found..", beer: beer })
        }

    })

router.put('/:name', (req, res) => {

   // validator(req.params.name)
   console.log(req.params)
    rp(options)
        .then(function (data) {
            //r console.log(data)
            res.json(data)
        })

})
router.post('/rating', (req, res) => {

    res.send('hello')
})

module.exports = router

/*
module.exports = function (app) {


    app.put('https://api.punkapi.com/v2/beers/:beer_name', (req, res) => {

        Date.findOneAndUpdate({ beer_name: req.params.beer_name }, {
            $set: {
                three: { state: [0, 0, 0, 0, 0, 0], checkup: [0, 0, 0, 0, 0, 0], discovery: [0, 0, 0, 0, 0, 0] }




            }
        }, { new: true }, function (err, date) {

            if (err) throw err;
            if (!date) {
                res.json({ success: false, message: "Date not found.." })
            } else {
                console.log(date)
                res.json({ success: false, message: "Date not found.." })

            }
        })
    })


    return app;

}
*/