const express               = require('express')
const router                = express.Router()
const cache                 = require('memory-cache')
const rp                    = require('request-promise')
const validationMiddleWare  = require('../../zaid_modules/validatorProd')
var DB                      = require('nosql');
var nosql                   = DB.load('./database/fridge.nosql');

var options = {
    uri: 'https://api.punkapi.com/v2/beers?beer_name='
};

router.post('/',validationMiddleWare, (req, res) => {

   // DEFINE BASE URI //
   options.uri='https://api.punkapi.com/v2/beers?beer_name='

   // DEFINE BASE URI //

   // INSERT HEADER INTO DATABASE //
   nosql.insert(req.headers).callback( (err)=> {

        // CHECK FOR ERRORS //
        if(err){

            // SEND ERROR OBJECT //
            res.json({
                        success: false,
                        message:"There was an issue storing the requests header values to the database..."
                    })
            // SEND ERROR OBJECT //

        }else{

            // CREATE ADD BEER NAME TO BASE URI //
            options.uri = options.uri + req.body.name

            // CHECK CACHE FOR BEER NAME //
            var cachedData = cache.get(req.body.name)


            if (cachedData){
                // ADD RATING TO CACHED DATA //
                console.log("Data already exists in cache...Serving cached result...")
                cachedData[0].rating = req.body.rating;

                // SEND CACHED DATA OBJECT //
                res.json({
                            success: true,
                            message: req.body.name+" found in the fridge... Enjoy... ;)",
                            data:cachedData
                        })
                // SEND CACHED DATA OBJECT //

            }else{

                // REQUEST BEER FROM PUNK API //
                rp(options)
                .then((data) =>{

                            // PARSE JSON //
                            var dataObjectLiteral = JSON.parse(data);

                            // CHECK IF EXISTS //

                            if(dataObjectLiteral[0] !== undefined){

                                // ADD RATING TO RETRIEVED BEER //
                                dataObjectLiteral[0].rating = req.body.rating;

                                //INSERT RETRIEVED BEER INTO DATABASE //
                                nosql.insert(dataObjectLiteral).callback(function (err) {

                                    // CHECK FOR ERROR //
                                    if(err){
                                        // RETURN FAIL OBJECT //
                                        res.json({success: false, message:"There was an error saving your rating to the database... :(", error:err})
                                        // RETURN FAIL OBJECT //
                                    }else{
                                        // STORE RETURNED BEER OBJECT TO CACHE //
                                        cache.put(req.body.name, dataObjectLiteral)
                                        // RETURN SUCCESS OBJECT //
                                        res.json({success: true, message: "Thanks! We've recieved your rating an updated our records...:)", data:dataObjectLiteral})
                                        // RETURN SUCCESS OBJECT //
                                    }

                                })

                                // INSERT RETRIEVED BEER INTO DATABASE //

                            // CHECK IF EXISTS //
                            }else{

                                // RETURN FAIL OBJECT //
                                res.json({success: false, message: req.body.name+" does not exist either in the fridge or at the store! :("})
                                // RETURN FAIL OBJECT //

                            }

                })

            }

        }

   })

})

router.get('/:name',validationMiddleWare, (req, res) => {

    // DEFINE BASE URI //
    options.uri='https://api.punkapi.com/v2/beers?beer_name='
    //

    // LOG REQUEST HEADER DATA //
    //console.log(req.headers)
    // LOG REQUEST HEADER DATA //

    // INSERT HEADER DATA INTO DATABASE //

    nosql.insert(req.headers).callback( (err)=> {

        // CHECK FOR ERRORS//

        if(err){

            // RETURN FAIL OBJECT //

            res.json({
                        success: false,
                        message:"There was an issue storing the requests header values to the database..."
                    })
            // RETURN FAIL OBJECT //

        }else{

            console.log("Request headers successfully stored in the database...")
            // CHECK IF BEER NAME(W/GET ADDENDUM) EXISTS IN THE CACHE //
            var cachedData = cache.get(req.params.name+"get")

            if (cachedData) {

                console.log("Data already exists in cache...Serving cached result...")
                // RETURN SUCCESS OBJECT //
                res.json({success: true, message: req.params.name+" found in the fridge... Enjoy... ;)",data:cachedData})
                // RETURN SUCCESS OBJECT //
            }else{

                console.log("Data does not exist in cache...Retrieving data from uri...")
                // UPDATE URI WITH BEER NAME PARAMETER //
                options.uri = options.uri + req.params.name

                // PUNK API REQUEST //
                rp(options)
                .then((data)=> {

                    // PARSE RETURNED JSON DATA //
                    var dataLiteral = JSON.parse(data)
                    // PARSE RETURNED JSON DATA //

                    // CHECK IF DATA EXISTS //
                    if(dataLiteral.length==0){
                        // RETURN FAIL OBJECT //
                        res.json({success: false, message:"Beer isn't in the fridge or at the store! :(...",data:dataLiteral})
                        // RETURN FAIL OBJECT //
                    }else{

                    // PARSE JSON DATA //

                    var dataLiteral = JSON.parse(data)

                    // PARSE JSON DATA

                    // FILL VARIABLE //
                    var trimmedResponseObject = {
                        id: dataLiteral[0].id,
                        name: dataLiteral[0].name,
                        description: dataLiteral[0].description,
                        first_brewed: dataLiteral[0].first_brewed,
                        food_pairing: dataLiteral[0].food_pairing
                    };
                    // FILL VARIABLE //

                    // ADD TO CACHE //
                    cache.put(req.params.name+"get",trimmedResponseObject)
                    //ADD TO CACHE //

                    // RETURN SUCCESS OBJECT //
                    res.json({
                                success: true,
                                message:"Beer does not exist in the fridge...Picked some up @ PunkApi ;)...",
                                data:trimmedResponseObject
                            })
                    // RETURN SUCCESS OBJECT //


                    }

                })

            }

        }

    })

})

module.exports = router

