'use strict';

class Node {
    constructor(data){
        this._data = data;
        this._next = null;
        this._prev = null;
    }

    get data(){
        return this._data;
    }

    set data(value){
        this._data = value;
    }

    get next(){
        return this._next;
    }

    set next(value){
        this._next = value;
    }

    get prev(){
        return this._prev;
    }

    set prev(value){
        this._prev = value;
    }

    valueOf(){
        return this.data;
    }
}

module.exports = Node;