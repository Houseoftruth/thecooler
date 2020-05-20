var validate = require('validate.js')
console.log("VALIDATOR HAS RUN")
exports = module.exports = function (input) {

  console.log("Validator Input...",input)
  
  return  (req, res, next) =>{

    //console.log("req", req)


    validate.validators.myAsyncValidator = (value)=> {

      console.log("value",value)

      ////console.log("MYASYNCVALIDATOR VALUE FOO",value)
      return new validate.Promise( (resolve, reject)=> {
       // setTimeout( ()=> {
          // console.log("PROROFD",value==="foo")
        
          if (value === "foo") resolve();
          else resolve("is not foo");
       // }, 100);
      });
    };
    validate.validators.headerValidator = (value)=> {

      console.log("value from headerValidator",value)

      ////console.log("MYASYNCVALIDATOR VALUE FOO",value)
      return new validate.Promise( (resolve, reject)=> {
       // setTimeout( ()=> {
          // console.log("PROROFD",value==="foo")
        
          if (value === "foo") resolve();
          else resolve("is not foo");
       // }, 100);
      });
    };
    var constraints = {
      name: { myAsyncValidator: true },
      'x-user':{
        email:true
      }
    }
      
        , success = "The val}idations have passed"//alert.bind(this, "The validations passed")
      , error = function (errors) {
        // console.log(JSON.stringify(errors, null, 2));
      };

    // Will call the success callback
    validate.async(req, constraints).then((input) => {

      console.log("VALIDATE ASYNC INPUT", input)

   
      if (input) {
        //.log("HERE58")
        //return next()
        //next().isTruthy()
        console.log("input exists...")
        //return input



      } else {

        console.log("input does exists...")

      }

    }).catch((error) => {
      
      console.log("catch((error)) => next()")
      //next()
      setTimeout(()=>{

        return next()


      },100)
      var results = { false: "FALSE", error: error }

    }).finally((errors) => {

      console.log("finally((errors)) => next()")
      setTimeout(()=>{

        return next()


      },100)


    })
  };

};




  // Will call the error callback with {name: ["Name is not foo"]} as the first argument
  // validate.async({name: "bar"}, constraints).then(success, error);


