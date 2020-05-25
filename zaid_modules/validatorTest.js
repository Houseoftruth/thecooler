var validate = require('validate.js')
var validatePut = require('validate.js')


exports = module.exports = function () {

  return (req, res, next, done) => {

console.log(req.body)
console.log(req.params)

    validate.validators.headerValidator = (value) => {


      return new validate.Promise((resolve, reject) => {

        if (value === "foo") resolve();
        else resolve("is not foo");

      });
    };
    validate.validators.idValidator = (idValue) => {

      return new validate.Promise((resolve, reject) => {

        if (Number(idValue)) resolve();
        else resolve(" is not a valid Id...");

      });

    };
    validate.validators.ratingValidator = (ratingValue) => {

      return new validate.Promise((resolve, reject) => {

        if (ratingValue == 1 || ratingValue == 2 || ratingValue == 3 ||
          ratingValue == 4 || ratingValue == 5) resolve();
        else resolve("is not a valid rating...rating must be from 1 to 5");

      });

    };

    console.log(req.body.id)
    if (req.body.id && req.body.rating) {
      console.log("EHERE", req)
      var requestObject = req.body
      var postRequirements = {

        rating: { ratingValidator: true },
        id: { idValidator: true },
        'x-user': {
          email: true
        }

      }

      validate.async(requestObject, postRequirements).then((success) => {

        if (success) {

          return done()

        }

      }).catch((error, done) => {

        // console.log(error['x-user'][0])
        console.log("Fail incoming...")

      })

    } else if (req.params.headers.name) {

      var requestObject = req.headers
      var putRequirements = {

        'x-user': {
          email: true
        }

      }
      validatePut.async(requestObject, putRequirements).then((successObject) => {

        if (success) {

          return done()

        }

      }).catch((error, done) => {

        // console.log(error['x-user'][0])
        console.log("Fail incoming...")

      })
    }

  };

};


