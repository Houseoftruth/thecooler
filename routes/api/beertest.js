const express = require('express')
const app = express();
const router = express.Router()
module.exports = function(router) { 
    
    
    router.get('/bling', function(req,res){

        res.json("BLING")
        
    
    })
}