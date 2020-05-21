var validate = require('validate.js')

exports = module.exports = function (config) {

 return (req,res,next)=>{

    if(req.body==={}){
      console.log("should run")
      console.log("req.body", req.body)
    }
    if(req.params){

      console.log("req.params", req.params)

    }
    var constraints = {

      'x-user':{
          email:true
        }

    }

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

    validate.async(req, constraints).then((success) => {

      if(success){

            return next()

      }

    }).catch((error) => {

    }).finally((errors) => {
  /*
                console.log('errors should be undefined..', errors)
                setTimeout(()=>{

                  return "hell"


                },100)

  */
    })
    ,success = "The val}idations have passed"//alert.bind(this, "The validations passed")
    ,error = function (errors) {
    };

  }

};




