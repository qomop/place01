"use strict";

var PlaceItem = function(text) {
	if (text) {
		var obj = JSON.parse(text);
		this.key = obj.key; // string that looks like this: x:y
		this.color = obj.color; // format: todo
	} else {
	    this.key = "";
	    this.color = "";
	}
};

PlaceItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var PlaceColorContract = function () {
    LocalContractStorage.defineMapProperty(this, "placeColorContract", {
        parse: function (text) {
            return new DictItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

PlaceColorContract.prototype = {
    init: function () {
        // todo
    },

    save: function (key, value) {

        // key = key.trim().split
        // value = value.trim();
        // todo: add validation
        // if (key === "" || value === ""){
        //     throw new Error("empty key / value");
        // }
        // if (value.length > 64 || key.length > 64){
        //     throw new Error("key / value exceed limit length")
        // }

        var from = Blockchain.transaction.from;
        var colorItem = this.repo.get(key);
        // if (dictItem){
        //     // todo: uncomment if you want to disable overwrite
        //     // throw new Error(key + " value has been occupied");
        // }

        colorItem = new PlaceItem();
        colorItem.key = key;
        colorItem.color = color;

        this.repo.put(key, colorItem);
    },

    get: function (key) {
        key = key.trim();
        if ( key === "" ) {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    }
};
module.exports = PlaceColorContract;