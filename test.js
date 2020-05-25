const chai = require('chai').use(require('chai-as-promised'));
const chaiHttp = require('chai-http')
var expect = require('chai').expect;
var sinon = require('sinon');
var validate = require('validate.js')




chai.should();
chai.use(chaiHttp)


var failingHeaderVerificationTestObject = {

    'x-user': 'foogmail.com'

}

var failingHeaderVerificationTestObject2 = {

    'x-user': 'foo@sgmail.com'

}

var passingHeaderVerificationTestObject = {

    'x-user': 'foo@gmailcom'


}

describe('my middleware', () => {

    //PASSING VERIFICATION TEST  //
    var constraints = {

      'x-user':{
          email:true
        }

    }
            var rasho = false;

            it("BOLLIANGO", (done)=>{

              const result = 5 + 5;

              if (result !== 10) {
                return done(new Error(`expect 10 got ${result}`));
              }
              done();



            })

            it('This should pass...', (done)=> {

               var nextSpy = sinon.spy();

                  console.log("HERE")
                validate.async(passingHeaderVerificationTestObject, constraints,nextSpy).then((success) => {
                    //return done()
                    console.log("OY")
                    if(success){
                        console.log("WE WON")
                          console.log(success)
                           return next()
                          setTimeout(()=>{
                            done()

                              //return next()


                          },1000)

                    }

                  }).catch((error) => {

                  })
                  expect(nextSpy.calledOnce).to.be.true;
                  done()


            });

        })

    //PASSING VERIFICATION TEST //


    //FAILING VERIFICATION TEST (NO @ SYMBOL) //






    //FAILING VERIFICATION TEST (NO @ SYMBOL) //



    //FAILING VERIFICATION TEST (NO . SYMBOL) //





    //FAILING VERIFICATION TEST (NO . SYMBOL) //



