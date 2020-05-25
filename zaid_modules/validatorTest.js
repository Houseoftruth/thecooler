var validate = require('validate.js')


exports = module.exports = function () {

  return (req, res, next, done) => {


    var postRequirements = {

      rating: { ratingValidator: true },
      id: { idValidator: true },
      'x-user': {
        email: true
      }

    }
    var putRequirements = {

      'x-user': {
        email: true
      }

    }
    validate.validators.headerValidator = (value) => {

      return new validate.Promise((resolve, reject) => {

        if (value === "foo") resolve();
        else resolve("is not foo");

      });

    };
    // ENSURE VALID X-USER EMAIL ADDRESS //

    validate.validators.idValidator = (idValue) => {

      return new validate.Promise((resolve, reject) => {

        if (Number(idValue)) resolve();
        else resolve(" is not a valid Id...");

      });

    };
    // ENSURE VALID ID VALUE //

    validate.validators.ratingValidator = (ratingValue) => {

      return new validate.Promise((resolve, reject) => {

        if (ratingValue == 1 || ratingValue == 2 || ratingValue == 3 ||
          ratingValue == 4 || ratingValue == 5) resolve();
        else resolve("is not a valid rating...rating must be from 1 to 5");

      });

    };
    // ENSURE VALID ID RATING //

    if (req.params) {

      var requestObject = req.headers

      validate.async(requestObject, putRequirements).then((successObject) => {

        if (successObject) {

          return done()

        }

      }).catch((error, done) => {

        console.log(error['x-user'][0])
        console.log("Fail incoming...")

      })
    }
    if (req.body) {

      var requestObject = req.body

      validate.async(requestObject, postRequirements).then((successObject) => {

        if (successObject) {

          return done()

        }

      }).catch((error, done) => {

        console.log(error['x-user'][0])
        console.log("Fail incoming...")

      })
    }




};

}
