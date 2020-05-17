var validate = require('validate.js')

module.exports = exports = function(config) {
    // Do something with config here
    console.log(config)

         
      validate.validators.myAsyncValidator = function(value) {
        return new validate.Promise(function(resolve, reject) {
          setTimeout(function() {
            if (value === "foo") resolve();
            else resolve("is not foo");
          }, 100);
        });
      };
      
      
      var constraints = {
          name: {myAsyncValidator: true},
          from: {
            email: true
          }
    }
        , success = "The validations have passed"//alert.bind(this, "The validations passed")
        , error = function(errors) {
           // console.log(JSON.stringify(errors, null, 2));
          };
      
      // Will call the success callback
      validate.async(config, constraints).then((input)=>{
          
        if(input){
           return input
        }else{
            console.log("SOOKSEEC")
        }
        
       //return next()
        //success, error);
      }).catch((error)=>{
        console.log("caught")
        console.log("FALSE", error)
        var results = {false:"FALSE",error:error}

      }).finally((errors)=>{

        console.log("FALSE")


      })
      
      // Will call the error callback with {name: ["Name is not foo"]} as the first argument
     // validate.async({name: "bar"}, constraints).then(success, error);
  
    return function(req, res, next) {
  
}
}