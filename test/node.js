var chai = require('chai')
  , should = chai.should()
  , expect = chai.expect;

var Node = require('../Node');

describe('Node', function () {

    describe('initialization', function () {
        it('valueOf of should return data', function (done) {
            var node = new Node('Hello');

            node.valueOf().should.equal('Hello');
            done();
        });
    });

});