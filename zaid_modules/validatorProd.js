var validate = require('validate.js')

module.exports = function (req, res, next) {

  req.headers['x-user'] = "bling@gmail.com";
  var requestObject = {};
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
  validate.validators.ratingValidator = (ratingValue) => {

    return new validate.Promise((resolve, reject) => {

      if (ratingValue == 1 || ratingValue == 2 || ratingValue == 3 ||
        ratingValue == 4 || ratingValue == 5) resolve();
      else resolve("is not a valid rating...rating must be from 1 to 5");

    });

  };
  validate.validators.idValidator = (idValue) => {

    return new validate.Promise((resolve, reject) => {

      if (Number(idValue)) resolve();
      else resolve(" is not a valid Id...");

    });

  };
  validate.validators.headerValidator = (value) => {

    return new validate.Promise((resolve, reject) => {

      if (value === "foo") resolve();
      else resolve("is not foo");

    });

  };

  if (req.body.id && req.body.rating) {

    requestObject = req.body

    validate.async(requestObject, postRequirements).then((successObject) => {

      if (successObject) {

        return next()

      }

    }).catch((error) => {

      return res.json({
        success: false,
        message: error
      })

    })

  } else if (req.params.name) {

    requestObject = req.headers
    validate.async(requestObject, putRequirements).then((successObject) => {

      if (successObject['x-user']) {

        return next()

      } else {

        console.log("Failed Test...")

        return res.json({

          success: false,
          message: "Request must include an 'x-user' key, and valid email..."

        })

      }

    }).catch((error) => {


      res.json({
        success: false,
        message: error

      })

    })

  }

};