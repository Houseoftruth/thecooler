var validate = require('validate.js')

exports = module.exports = function () {

 return (req,res,next,done)=>{


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

            return done()

      }

    }).catch((error,done)=>{

        console.log(error['x-user'][0])
        console.log("Fail incoming...")

    })


  }

};




