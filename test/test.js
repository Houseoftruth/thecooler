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

  var failingHeaderVerificationTestObject2 = {

    'x-user': 'foogmail.com'

  }

  var passingHeaderVerificationTestObject = {

    'x-user': 'foo@gmail.com'


  }

  validationMiddleWare(failingHeaderVerificationTestObject, {}, nextSpy, done);


});
