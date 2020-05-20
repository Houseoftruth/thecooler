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

router.post('/',validationMiddleWare, (req, res) => {

   console.log("Header information...")
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
                console.log("Cached data", cachedData)
                cachedData.rating = req.body.rating;
                res.json({
                            success: true, 
                            message: req.body.name+" found in the fridge... Enjoy... ;)",
                            data:cachedData
                        })
                
            }else{
                console.log("Options", options)
                rp(options)
                .then((data) =>{

                            var dataObjectLiteral = JSON.parse(data);
                            console.log("dataObectLiteral", dataObjectLiteral)
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
    options.uri='https://api.punkapi.com/v2/beers?beer_name='

    nosql.insert(req.headers).callback( (err)=> {

        if(err){

            res.json({ 
                        success: false, 
                        message:"There was an issue storing the requests header values to the database..."
                    })

        }else{

            console.log("Request was successfully stored in the database...")

            var cachedData = cache.get(req.params.name)

            if (cachedData) {

                console.log("Data already exists in cache...Serving cached result...")
                console.log("Cached data", cachedData)
                res.json({success: true, message: req.params.name+" found in the fridge... Enjoy... ;)",data:cachedData})
        
            }else{
               // https://api.punkapi.com/v2/beers?beer_name=budweiser
                console.log("Data does not exist in cache...Retrieving data from uri...")
                console.log("New uri", options.uri+':'+req.params.name)
                //console.log("req.params.name after loop",req.params.name)
                options.uri = options.uri + req.params.name
                console.log("Options", options)
                //options.param ="beer_name"
                console.log(options)
                rp(options)
                .then((data)=> {
                    console.log("data",data.length)
                    console.log(data)
                    var dataLiteral = JSON.parse(data)
                    console.log(dataLiteral.length)

                    if(dataLiteral.length==0){
                        res.json({success: false, message:"Beer does not exist at the store...",data:dataLiteral})
 
                    }else{

                        console.log("but also here...")
                    var dataLiteral = JSON.parse(data)

                    console.log("data",dataLiteral[0])
                    
                    var trimmedResponseObject = {
                        id: dataLiteral[0].id,
                        name: dataLiteral[0].name,
                        description: dataLiteral[0].description,
                        first_brewed: dataLiteral[0].first_brewed,
                        food_pairing: dataLiteral[0].food_pairing
                    };


                   // id, name, description, first_brewed, food_pairings

                    cache.put(req.params.name,trimmedResponseObject)
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