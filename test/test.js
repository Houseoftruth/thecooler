const chai = require('chai').use(require('chai-as-promised'));
const chaiHttp = require('chai-http')
var expect = require('chai').expect;
var sinon = require('sinon');
const middleware = require('../zaid_modules/validatorTest')


var validationMiddleWare = middleware(/./);
var nextSpy = sinon.spy();


it('Done should be called (indicating a valid user email..)', (done) => {

 // var validationMiddleWare = middleware(/./);
  //var nextSpy = sinon.spy();



// INSERT INTO VALIDATION MIDDLWARE TO CAUSE A FAILING TEST //


var passingPutTestObject = {

  params:{
    headers:{
      name:"Homer",
      'x-user':'foo@gmail.com'
    },
    body:{
      id:1
    },
    headers:{
      'x-user':'foo@gmail.com'
    }
  }
}


  // INSERT INTO VALIDATION MIDDLWARE TO CAUSE A PASSING TEST //

  validationMiddleWare(passingPutTestObject, {}, nextSpy, done);


});
