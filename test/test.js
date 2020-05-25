var sinon = require('sinon');
const middleware = require('../zaid_modules/validatorTest')


var validationMiddleWare = middleware(/./);
var nextSpy = sinon.spy();

it('Done should be called (indicating a valid user email, id, and rating..)', (done) => {



  var passingPostTestObject = {

    body:{
      id:1,
      rating:5,
      'x-user':'foo@gmail.com'
    }

  }
  var failingPostTestObject = {

    body:{
      id:1,
      rating:5,
      'x-user':'foogmail.com' // NO @ SYMBOL //
    }

  }
  var failingPostTestObject2 = {

    body:{
      id:1,
      rating:5,
      'x-user':'foo@gmailcom' //  NO . SYMBOL //
    }

  }


  // INSERT INTO VALIDATION MIDDLWARE TO CAUSE A PASSING TEST //

  validationMiddleWare(failingPostTestObject, {}, nextSpy, done);


});

it('Done should be called (indicating a valid user email..)', (done) => {

// INSERT INTO VALIDATION MIDDLWARE TO CAUSE A FAILING TEST //

var passingPutTestObject = {

  params:{

    headers:{
      name:"Homer",
      'x-user':'foo@gmail.com'
    }

  }
}

var failingPutTestObject = {

  params:{

    headers:{
      name:"Homer",
      'x-user':'foogmail.com' // NO @ SYMBOL (FAIL) //
    }

  }
}
var failingPutTestObject2 = {

  params:{

    headers:{
      name:"Homer",
      'x-user':'foo@gmailcom' // NO . SYMBOL (FAIL) //
    }

  }
}


  // INSERT INTO VALIDATION MIDDLWARE TO CAUSE A PASSING TEST //

  validationMiddleWare(passingPutTestObject, {}, nextSpy, done);


});
