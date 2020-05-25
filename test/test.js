const chai = require('chai').use(require('chai-as-promised'));
const chaiHttp = require('chai-http')
var expect = require('chai').expect;
var sinon = require('sinon');
const middleware = require('../zaid_modules/validatorTest')



it('Done should be called (indicating a valid user email..)', (done) => {

  var validationMiddleWare = middleware(/./);
  var nextSpy = sinon.spy();

  var failingHeaderVerificationTestObject = {

    'x-user': 'foo@gmaicom'

  }

// INSERT INTO VALIDATION MIDDLWARE TO CAUSE A FAILING TEST //

  var failingHeaderVerificationTestObject2 = {

    'x-user': 'foogmail.com'

  }

// INSERT INTO VALIDATION MIDDLWARE TO CAUSE A FAILING TEST //


  var passingHeaderVerificationTestObject = {

    'x-user': 'foo@gmail.com'


  }

  // INSERT INTO VALIDATION MIDDLWARE TO CAUSE A PASSING TEST //

  validationMiddleWare(passingHeaderVerificationTestObject, {}, nextSpy, done);


});
