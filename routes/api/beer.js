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

   options.uri='https://api.punkapi.com/v2/beers?beer_name='

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
                cachedData[0].rating = req.body.rating;

                res.json({
                            success: true,
                            message: req.body.name+" found in the fridge... Enjoy... ;)",
                            data:cachedData
                        })

            }else{

                rp(options)
                .then((data) =>{

                            var dataObjectLiteral = JSON.parse(data);


                            if(dataObjectLiteral[0] !== undefined){

                                dataObjectLiteral[0].rating = req.body.rating;

                                nosql.insert(dataObjectLiteral).callback(function (err) {

                                    if(err){

                                        res.json({success: false, message:"There was an error saving your rating to the database... :(", error:err})

                                    }else{

                                        cache.put(req.body.name, dataObjectLiteral)
                                        res.json({success: true, message: "Thanks! We've recieved your rating an updated our records...:)", data:dataObjectLiteral})

                                    }
                                })

                            }else{

                                res.json({success: false, message: req.body.name+" does not exist either in the fridge or at the store! :("})

                            }

                })

            }

        }

   })

})

router.get('/:name',validationMiddleWare, (req, res) => {


    options.uri='https://api.punkapi.com/v2/beers?beer_name='

    nosql.insert(req.headers).callback( (err)=> {

        if(err){

            res.json({
                        success: false,
                        message:"There was an issue storing the requests header values to the database..."
                    })

        }else{

            console.log("Request headers successfully stored in the database...")

            var cachedData = cache.get(req.params.name+"get")

            if (cachedData) {

                console.log("Data already exists in cache...Serving cached result...")
                res.json({success: true, message: req.params.name+" found in the fridge... Enjoy... ;)",data:cachedData})

            }else{

                console.log("Data does not exist in cache...Retrieving data from uri...")
                options.uri = options.uri + req.params.name

                rp(options)
                .then((data)=> {

                    var dataLiteral = JSON.parse(data)

                    if(dataLiteral.length==0){

                        res.json({success: false, message:"Beer isn't in the fridge or at the store! :(...",data:dataLiteral})

                    }else{

                    var dataLiteral = JSON.parse(data)


                    var trimmedResponseObject = {
                        id: dataLiteral[0].id,
                        name: dataLiteral[0].name,
                        description: dataLiteral[0].description,
                        first_brewed: dataLiteral[0].first_brewed,
                        food_pairing: dataLiteral[0].food_pairing
                    };



                    cache.put(req.params.name+"get",trimmedResponseObject)
                    res.json({
                                success: true,
                                message:"Beer does not exist in the fridge...Picked some up @ PunkApi ;)...",
                                data:trimmedResponseObject
                            })


                    }

                })

            }

        }

    })

})

module.exports = router

