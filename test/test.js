const chai = require('chai')
const chaiHttp = require('chai-http')
var expect = require('chai').expect;
var sinon = require('sinon');
const middleware = require('../zaid_modules/validator')

chai.should();
chai.use(chaiHttp)


var failingHeaderVerificationTestObject = {

    'x-user': 'foo@gmailcom'

}

var failingHeaderVerificationTestObject2 = {

    'x-user': 'foogmail.com'

}

var passingHeaderVerificationTestObject = {

    'x-user': 'foo@gmail.com'


}

describe('my middleware', () => {


    describe('request handler creation', () => {

        var mw;

        beforeEach(() => {

            mw = middleware({}, { 'name': 'food', 'from': 'boosh@gmail.com' }, { 'name': 'food', 'from': 'boosh@gmail.com' });
            console.log(mw.length)

        });

        it('should accept three arguments', () => {

            expect(mw.length).to.equal(3);

        });

    });

    //FAILING VERIFICATION TEST  //

    describe('request handler calling (pass)',  function() {


        it('should call next() once',  function() {

            var mw = middleware(/./);
            var nextSpy = sinon.spy();

            mw(passingHeaderVerificationTestObject, {}, nextSpy);

            setTimeout(() => {

                expect(nextSpy.calledOnce).to.be.true;

            }, 200);

        });

    });

    //PASSING VERIFICATION TEST //


    //FAILING VERIFICATION TEST (NO @ SYMBOL) //

    describe('request handler calling (fail)',  function() {


        it('should call next() once',  function() {

           var mw = middleware(/./);
           var nextSpy = sinon.spy();

            mw(failingHeaderVerificationTestObject, {}, nextSpy);
            console.log("nextSpy.calledOnce", nextSpy.calledOnce)
       // setTimeout(()=>{
                //try{
                    setTimeout(() => {

                expect(nextSpy.calledOnce).to.be.true;
                    //done()
                }, 200);
               // done()
               // }catch(e){

               // }

          // }, 1000)


        });

    });

    //FAILING VERIFICATION TEST (NO @ SYMBOL) //



    //FAILING VERIFICATION TEST (NO . SYMBOL) //

    describe('request handler calling (fail)',  function() {


        it('should call next() once',  function() {

           var mw = middleware(/./);
           var nextSpy = sinon.spy();

            mw(failingHeaderVerificationTestObject2, {}, nextSpy);
            console.log("nextSpy.calledOnce", nextSpy.calledOnce)
       // setTimeout(()=>{
                //try{
                    setTimeout(() => {

                expect(nextSpy.calledOnce).to.be.true;
                    //done()
                }, 200);
               // done()
               // }catch(e){

               // }

          // }, 1000)


        });

    });

    //FAILING VERIFICATION TEST (NO . SYMBOL) //

})

