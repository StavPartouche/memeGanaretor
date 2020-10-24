'use strict';

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function sortByProperty(property, isDesc = false) {
    var sortOrder = (isDesc) ? -1 : 1;
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function sortTxt(arr) {
    arr.sort(function (a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
    });
}

function sortNums(arr) {
    arr.sort(function (a, b) {
        return a.price - b.price
    })
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}