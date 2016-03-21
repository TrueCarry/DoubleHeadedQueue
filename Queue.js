'use strict';
var Node = require('./Node');

class Queue {
    constructor() {
        this.first = null;
        this.last = null;

        this.size = 0;
    }

    enqueue(data) { //11 ops
        let node = new Node(data); //3
        let n;

        if (!this.first){
            this.first = node;
            this.last = node;
        } else {
            n = this.last;

            node.prev = n;
            n.next = node;

            this.last = node; //9
        }

        this.size += 1;
        return node; //11
    }

    unshift(data){
        let node = new Node(data);
        let n;

        if (!this.first){
            this.first = node;
            this.last = node;
        } else {
            n = this.first;

            node.next = n;
            n.prev = node;

            this.first = node;
        }

        this.size += 1;
        return node;
    }

    dequeue() {
        if(!this.last){
            return null;
        }
        let last = this.last;

        if(last.prev) {
            this.last = last.prev;
            this.last.next = null;
        }else{
            this.first = null;
            this.last = null;
        }

        this.size -= 1;
        return last;
    }

    shift(){
        if(!this.first){
            return null;
        }
        let first = this.first;

        if(first.next) {
            this.first = first.next;
            first.next.prev = null;
        }else{
            this.first = null;
            this.last = null;
        }

        this.size -= 1;
        return first;
    }


    get length(){
        return this.size;
    }

    isEmpty(){
        return this.length == 0;
    }

    Clear(){
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    toJSON() {
        if(!this.first) return [];
        let tmp = [];
        let curr = this.first;

        do{
            tmp.push(curr.data);
            curr = curr.next
        }while(curr);

        return tmp;
    }
}

module.exports = Queue;