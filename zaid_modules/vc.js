var validate = require('validate.js')

module.exports = function (req, res, next) {

  console.log("SHOULD BE HERE...", req.body)
  console.log("SHOULD BE HERE....PUTTER", req.params)


  var requestObject = {}

  var postRequirements = {

    rating: { ratingValidator: true },
    id: { idValidator: true },
    'x-user':{
      email:true
    }

  }
  var putRequirements = {

    'x-user':{
      email:true
    }

  }
  validate.validators.ratingValidator = (ratingValue)=> {

    console.log("rating value",ratingValue)

    return new validate.Promise( (resolve, reject)=> {

        if (ratingValue == 1|| ratingValue == 2||ratingValue == 3||
            ratingValue == 4||  ratingValue == 5) resolve();
        else resolve("is not a valid rating...rating must be from 1 to 5");

  });

  };
  validate.validators.idValidator = (idValue)=> {

    return new validate.Promise( (resolve, reject)=> {

        if (Number(idValue)) resolve();
        else resolve(" is not a valid Id...");

    });

  };
  validate.validators.headerValidator = (value)=> {

      console.log("value from headerValidator",value)

      return new validate.Promise( (resolve, reject)=> {

        if (value === "foo") resolve();
        else resolve("is not foo");

    });

  };

  if(req.body.id && req.body.rating){
    console.log("SHOULD BE HERE...")

     requestObject = req.body

     validate.async(requestObject, postRequirements).then((success) => {

      console.log("Validate.async(config, constraints) input...", success)

      if (success) {

          console.log("input exists...", success)
          return next()

      } else {

          console.log("input does exists...")

      }

    }).catch((error) => {

          console.log("catch((error)) => next()")
          console.log('error should be undefined..', error)

          return res.json({
                          success: false,
                          message: error
                        })

      setTimeout(()=>{

      },100)

      var results = { false: "FALSE", error: error }

    }).finally((errors) => {

        console.log('errors should be undefined..', errors)

      setTimeout(()=>{

        return "hell"


      },100)


    }),success = "The validations have passed"
      ,error = function (errors) {
   };
  }else if(req.params.name){

      console.log("Requesting the parameters was successful", req.params)
      requestObject =  req.headers
      validate.async(requestObject, putRequirements).then((input) => {

      console.log("Validate.async(config, constraints) input...", input)
      //return "hello"

      if (input) {
        //.log("HERE58")
        //return next()
        //next().isTruthy()
        console.log("input exists...", input)
        return next()



      } else {

        console.log("input does exists...")

      }

      }).catch((error) => {

          console.log("catch((error)) => next()")
          console.log('error should be undefined..', error)
          return res.json({
                            success: false,
                            message: error

                          })

        setTimeout(()=>{

          //return next()


        },100)
        var results = { false: "FALSE", error: error }

        }).finally((errors) => {

          console.log('errors should be undefined..', errors)
          setTimeout(()=>{

            return "hell"

          },100)

        })
        ,success = "The valLidations have passed"
        ,error = function (errors) {
        };

  }






};