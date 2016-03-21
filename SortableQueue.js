'use strict';

var Queue = require('./Queue');
var debug = null; 
try{
    debug = require('debug')('queue');
}catch(e){
    debug = console.log;
}

class SortableQueue extends Queue {
    cunstructor(){
        super.constructor();
    }

    slice(start, end){//8 + 16n
        if(this.length <= 1){
            if(start == 0) return this;
            else           return new SortableQueue();
        }

        let i = 0;

        let curr = this.first; //3
        let result = new SortableQueue(); //7

        do{
            if(i < start){ //1
                curr = curr.next;
                i++;
            }else{
                if(i < end) { //2
                    result.enqueue(curr.data);  //11 + 2 => 13
                    curr = curr.next;
                    i++; //15
                }
                else {
                    break;
                }
            }
        }while(curr); //16

        return result; //8 + 16n
    }

    concat(){
        let args = [].slice.apply(arguments);

        debug('concating', this.toJSON());

        for(let arg of args){
            debug('concating arr', arg.toJSON());
            while(arg.last) this.enqueue(arg.shift().data);
        }

        debug('concating', this.toJSON());

        return this;
    }

    sort(){
        let res = mergesort(this);

        debug('sort', JSON.stringify([this, res], null, 2));

        this.first = res.first;
        this.last  = res.last;
        this.size  = res.size;

        return this;
    }
}

function mergesort(list){
    if (list.length <= 1)
        return list;

    let mid = Math.floor(list.length / 2); //4 ops

    let left  = list.slice(0, mid);             //
    let right = list.slice(mid, list.length);   // left + right ~= 16n + 16 + 2

    debug("Slicing", list.toJSON(), mid, left.toJSON(), right.toJSON());

    //22 + 16n before merge
    return merge(mergesort(left), mergesort(right));
    /*22 + 16n + 17 + 17n = 39 + 33n ops after merge;
    We need to multiply that on log2(n) we're dividing our queue into two of half size until we get queue with size = 1.

                                                   n
                      n/2                                               n/2
              n/4                n/4                            n/4                     n/4
                                                  ...
                                                  ...
                                                  ...

         1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

    F(n) = log2(n) * (39 + 33n)
    O(F(n)) = nlog2(n)

    F(100 000) = 16.6 * 3300039 = 54 780 647.4
    */
}

function merge(left, right){
    debug("merge called", left.toJSON(), right.toJSON());
    let sorted = new SortableQueue(); //5

    while (left && left.length > 0 && right && right.length > 0){ //4
        debug("equals?", left.first.data, right.first.data, left.first <= right.first);
        sorted.enqueue( left.first <= right.first ? left.shift().data : right.shift().data ); //13
    }//17n

    return sorted.concat(left, right);//11 from 1 enqueue, because everything else already shifted from queues.
    //result: 17 + 17n
}

module.exports = SortableQueue;