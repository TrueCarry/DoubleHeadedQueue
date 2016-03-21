var chai = require('chai')
    , should = chai.should()
    , expect = chai.expect;

var SortableQueue = require('../SortableQueue');

describe('SortableQueue', function () {

    describe('slice', function () {
        it('normal slice', function (done) {
            var q = new SortableQueue();

            q.enqueue(0);
            q.enqueue(1);
            q.enqueue(2);
            q.enqueue(3);
            q.enqueue(4);

            var first = q.slice(0, 5);

            first.first.data.should.equal(0);
            first.last.data.should.equal(4);
            first.last.prev.prev.data.should.equal(2);

            var second = q.slice(3, 5);

            second.first.data.should.equal(3);
            second.last.data.should.equal(4);
            second.last.prev.data.should.equal(3);

            done();
        });

        it('Wrong start slice', function (done) {
            var q = new SortableQueue();

            q.enqueue(0);
            q.enqueue(1);
            q.enqueue(2);
            q.enqueue(3);
            q.enqueue(4);

            var first = q.slice(5, 5);

            should.not.exist(first.first);
            should.not.exist(first.last);

            var second = q.slice(10, 5);

            should.not.exist(second.first);
            should.not.exist(second.last);

            done();
        });
    });

    describe('concat', function () {
        it('concat two simple Queues', function (done) {
            var f = new SortableQueue();
            var s = new SortableQueue();

            f.enqueue(0);
            f.enqueue(1);
            s.enqueue(2);
            s.enqueue(3);

            var t = f.concat(s);

            t.first.data.should.equal(0);
            t.last.data.should.equal(3);

            t.first.next.next.data.should.equal(2);
            t.last.prev.prev.data.should.equal(1);

            done();
        });
    });

    describe('sort', function () {
        it('sort simple Queue', function (done) {
            var q = new SortableQueue();

            q.enqueue(0);
            q.enqueue(1);
            q.enqueue(5);
            q.enqueue(3);

            var sorted = q.sort();

            sorted.first.data.should.equal(0);
            sorted.first.next.data.should.equal(1);
            sorted.first.next.next.data.should.equal(3);
            sorted.first.next.next.next.data.should.equal(5);

            done();
        });

        it('sort random Queue(1 000 elements)', function (done) {
            var q = new SortableQueue();

            for(var i = 0; i < 1000; i++){
                q.enqueue(Math.floor(Math.random() * 1000000));
            }

            var sorted = q.sort();
            var curr = sorted.first.next;

            while(curr){
                expect(curr.data).to.be.at.least(curr.prev.data);
                if(curr.next) expect(curr.data).to.be.at.most(curr.next.data);
                curr = curr.next;
            }

            done();
        });
    });

});