const express = require('express')
const app = express();
const router = express.Router()

const mongodb = require('mongodb')
const bodyParser = require('body-parser')
const cache = require('memory-cache')
const rp = require('request-promise')
const request = require('request')
const validationMiddleWare = require('../../zaid_modules/vc')

var DB = require('nosql');

var nosql = DB.load('./database/fridge.nosql');
console.log(nosql)
//var db = NoSQL.load('../../database',nosql);

//const validator = require('../../zaid_modules/validator')
app.use(validationMiddleWare)
cache.put('foo', {});
console.log(cache.get('data'));
var validate = require('validate.js')

var options = {
    uri: 'https://api.punkapi.com/v2/beers?beer_name='
};


    
//router.use(bodyParser.urlencoded({ 'extended': 'true' })); 
router.get('/bling', function (req, res) {

    res.json("BLING")

})
/*
router.use('/:name', function (req, res, next) {
    console.log("before");
    console.log(req.params)
    console.log(req.headers)
    console.log("req.headers['x-user']", req.headers['x-user'])

    var requestObject = {

        email: req.headers['x-user'],
        from: req.headers['x-user'],
        header: req.headers,
        body: req.params
    }


    validate.validators.headerValidator = function (value) {
        console.log(value)
        return new validate.Promise(function (resolve, reject) {

            setTimeout(function () {

                if (value) resolve();

                else resolve("not present on 'x-user' header value...");

            }, 100);
        });
    };

    var constraints = {
        email: { headerValidator: true },
        from: {
            email: true
        }
    }
        , success = "The validations have passed"//alert.bind(this, "The validations passed")
        , error = function (errors) {
        };

    // Will call the success callback
    validate.async(requestObject, constraints).then((input) => {

        //console.log("DFDLKFJ")
        console.log("Validator has run...")

        if (input) {
            //nosql.find().query("doc.firstname == 'firstname'").callback(console.log);
            nosql.insert(requestObject).callback(function (err) {
                console.log('The user has been created.', err);
            });
            nosql.find().make(function (filter) {
                filter.where('age', '>', 20);                //filter.where('removed', false);
                filter.callback(function (err, response) {
                    console.log(err, response);
                });
            });
            console.log("All validator conditions met...")
            return next()

        }

    }).catch((error) => {
        console.log("caught")
        console.log("FALSE", error)
        res.json({ success: false, message: error.email[0] })
        var results = { false: "FALSE", error: error }

    }).finally((errors) => {

        console.log("FALSE")

    })
})*/
//router.use( validationMiddleWare )

router.post('/',validationMiddleWare, (req, res) => {

   console.log("Header information...")

   nosql.insert(req.headers).callback( (err)=> {

        if(err){

            res.json({ 
                        success: false, 
                        message:"There was an issue storing the requests header values to the database..."
                    })

        }else{

            options.uri = options.uri + req.body.name

            var cachedData = cache.get(req.body.name)
        
            if (cachedData){
        
                console.log("Data already exists in cache...Serving cached result...")
                console.log("Cached data", cachedData)
                cachedData.rating = req.body.rating;
                res.json({
                            success: true, 
                            message: req.body.name+" found in the fridge... Enjoy... ;)",
                            data:cachedData
                        })
                
            }else{

                rp(options)
                .then((data) =>{
                    
                            var dataObjectLiteral = JSON.parse(data);
                            dataObjectLiteral[0].rating = req.body.rating;

                            nosql.insert(dataObjectLiteral).callback(function (err) {
                            
                                if(err){
                    
                                    res.json({success: false, message:"There was an error saving your rating to the database... :(", error:err})
                                
                                }else{
                    
                                    cache.put(req.body.name,data)
                                    res.json({success: true, message:"Thanks! We've recieved your rating an updated our records...:)", data:data})
                            
                                }
                            })
                
                })  
            
            }


        }
   

   })



/*}
        nosql.insert(requestObject).callback(function (err) {
            console.log('The user has been created.', err);
        });*/
     

  // res.json({success: false})
})

router.get('/api.punkapi.com/v2/beers/:beername'
    , (req, res) => {

        if (err) throw err;
        if (!res) {
            res.json({ success: false, message: "There was an error retrieving beer..." })
        } else {
            res.json({ success: true, message: "Beer has been found..", beer: beer })
        }

    })

router.put('/:name',validationMiddleWare, (req, res) => {

        console.log("hello",req.headers)
    nosql.insert(req.headers).callback( (err)=> {

        if(err){

            res.json({ 
                        success: false, 
                        message:"There was an issue storing the requests header values to the database..."
                    })

        }else{

            var cachedData = cache.get(req.params.name)

            if (cachedData) {

                console.log("Data already exists in cache...Serving cached result...")
                console.log("Cached data", cachedData)
                res.json({success: true, message: req.params.name+" found in the fridge... Enjoy... ;)",data:cachedData})
        
            }else{
        
                console.log("Data does not exist in cache...Retrieving data from uri...")
                console.log("New uri", options.uri+':'+req.params.name)
                console.log("req.params.name after loop",req.params.name)
                options.uri = options.uri + req.params.name
                options.param ="beer_name"
                console.log(options)
                rp(options)
                .then(function (data) {
        
                    cache.put(req.params.name,data)
                    res.json({
                                success: true, 
                                message:"Beer does not exist in the fridge...Picked some up @ PunkApi ;)...", 
                                data:data
                            })
        
                    })
            }
        }
    })

    

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