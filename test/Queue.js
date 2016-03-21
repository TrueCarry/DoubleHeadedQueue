var chai = require('chai')
    , should = chai.should()
    , expect = chai.expect;

var Queue = require('../Queue');

describe('Queue', function () {

    describe('initialization', function () {
        it('Should be empty on init', function (done) {
            var q = new Queue();

            should.not.exist(q.first);
            should.not.exist(q.last);

            q.size.should.equal(0);

            done();
        });

        it('Can add elements', function (done) {
            var q = new Queue();

            q.enqueue('First');

            q.first.data.should.equal('First');
            q.last.data.should.equal('First');

            q.enqueue('Second');

            q.first.data.should.equal('First');
            q.last.data.should.equal('Second');

            q.enqueue('Third');

            q.first.data.should.equal('First');
            q.last.data.should.equal('Third');

            q.first.next.data.should.equal('Second');
            q.last.prev.data.should.equal('Second');

            done();
        });
    });

    describe('unshift', function () {
        it('Can unshift', function (done) {
            var q = new Queue();

            q.unshift('First');

            q.first.data.should.equal('First');
            q.last.data.should.equal('First');

            q.unshift('Second');

            q.first.data.should.equal('Second');
            q.last.data.should.equal('First');

            q.enqueue('Third');

            q.first.data.should.equal('Second');
            q.last.data.should.equal('Third');

            q.first.next.data.should.equal('First');
            q.last.prev.data.should.equal('First');

            done();
        });
    });

    describe('dequeue', function () {
        it('Should return null on empty queue', function (done) {
            var q = new Queue();

            should.not.exist(q.dequeue());

            done();
        });
    });

    describe('shift', function () {
        it('Can shift', function (done) {
            var q = new Queue();

            q.unshift('First');

            q.first.data.should.equal('First');
            q.last.data.should.equal('First');

            q.unshift('Second');

            q.first.data.should.equal('Second');
            q.last.data.should.equal('First');

            q.shift().data.should.equal('Second');
            q.shift().data.should.equal('First');
            should.not.exist(q.shift());

            done();
        });
    });

    describe('isEmpty', function () {
        it('isEmpty', function (done) {
            var q = new Queue();

            q.isEmpty().should.equal(true);

            q.enqueue(1);

            q.isEmpty().should.equal(false);

            q.dequeue();

            q.isEmpty().should.equal(true);

            done();
        });
    });

    describe('Clear', function () {
        it('Clear', function (done) {
            var q = new Queue();

            q.isEmpty().should.equal(true);

            q.enqueue(1);

            q.isEmpty().should.equal(false);

            q.Clear();

            should.not.exist(q.first);
            should.not.exist(q.last);
            q.length.should.equal(0);

            done();
        });
    });

});