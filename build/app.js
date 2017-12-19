/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _date = __webpack_require__(1);

/**
 * @function getDaysLeft - returns the number of days remaining to the event
 * @param {object} currentDate - Date object instance constructed with current date
 * @param {object} eventDate - Date object instance constructed with the date of event
 * @return {number}
 */
var getDaysLeft = function getDaysLeft(currentDate, eventDate) {
    var daysLeft = 0;

    if (currentDate.getFullYear() === eventDate.getFullYear()) {
        daysLeft = eventDate.getDayOfYear() - currentDate.getDayOfYear();
    } else {
        var yearDiff = eventDate.getFullYear() - currentDate.getFullYear();

        daysLeft = currentDate.isLeapYear() ? 366 - currentDate.getDayOfYear() : 365 - currentDate.getDayOfYear();

        console.log(currentDate.getDayOfYear());

        for (var i = yearDiff - 1; i > 0; i--) {
            var temp = new _date.Date(eventDate.getFullYear() - i);
            var toAdd = temp.isLeapYear ? 366 : 365;
            daysLeft += toAdd;
        }

        daysLeft += eventDate.getDayOfYear();
    }

    if (currentDate.getHours() === eventDate.getHours() && currentDate.getMinutes() >= eventDate.getMinutes() || currentDate.getHours() > eventDate.getHours()) {
        daysLeft--;
    }

    return daysLeft;
};

/**
 * @function getHoursLeft - returns the number of hours below full day remaining to the event
 * @param {object} currentDate - Date object instance constructed with current date
 * @param {object} eventDate - Date object instance constructed with the date of event
 * @return {number}
 */
var getHoursLeft = function getHoursLeft(currentDate, eventDate) {
    var hoursLeft = 0;

    if (currentDate.getHours() <= eventDate.getHours()) {
        hoursLeft = eventDate.getHours() - currentDate.getHours();
    } else {
        hoursLeft = 24 - currentDate.getHours() + eventDate.getHours();;
    }

    return hoursLeft;
};

/**
 * @function getRestsLeft - returns the number of minutes below full hour or second below full minute remaining to the event
 * @param {number} currentDate - value returned by date.getMinutes() or date.getSeconds()
 * @param {object} eventDate - value returned by date.getMinutes() or date.getSeconds()
 * @return {number}
 */
var getRestLeft = function getRestLeft(currentDate, eventDate) {
    var result = 0;
    if (currentDate <= eventDate) {
        result = eventDate - currentDate;
    } else {
        result = 60 - currentDate + eventDate;
    }

    return result;
};

/**
 * @function runCounter - appends value of days, hours, minutes and seconds remaining to the event to DOM elements, changes them every seconds. Clears interval if time to event is equal or less than 0 then sets final counter value to 0 days, 0 hours, 0 minutes, 0 seconds, 
 * @param {number} days - number of days remaining to the event
 * @param {number} hours - number of hours remaining to the event
 * @param {number} minutes - number of minutes remaining to the event
 * @param {number} seconds - number of seconds remaining to the event
 */
var runCounter = function runCounter(days, hours, minutes, seconds) {

    var daysDiv = document.getElementById('days');
    var hoursDiv = document.getElementById('hours');
    var minutesDiv = document.getElementById('minutes');
    var secondsDiv = document.getElementById('seconds');

    var interval = setInterval(function () {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }

        if (minutes < 0) {
            minutes = 59;
            hours--;
        }

        if (hours < 0) {
            hours = 23;
            days--;
        }

        var daysString = days < 10 ? '0' + days : '' + days;
        var hoursString = hours < 10 ? '0' + hours : '' + hours;
        var minutesString = minutes < 10 ? '0' + minutes : '' + minutes;
        var secondsString = seconds < 10 ? '0' + seconds : '' + seconds;

        if (days < 0) {
            clearInterval(interval);
            daysString = '00';
            hoursString = '00';
            minutesString = '00';
            secondsString = '00';
        }

        daysDiv.innerText = daysString;
        hoursDiv.innerText = hoursString;
        minutesDiv.innerText = minutesString;
        secondsDiv.innerText = secondsString;
    }, 1000);
};

/**
 * @function setCounter - sets the number of days, hours, minutes, and seconds remaining to the event then runs runCounter()
 */
var setCounter = function setCounter() {
    var currentDate = new _date.Date(); //Current date, I suggest to use external API's or server time functions and pass them value as an argument of Date() constructor
    var eventDate = new _date.Date(2018, 0, 10, 20, 30, 0); //Here you can set any date of the event
    var daysLeft = getDaysLeft(currentDate, eventDate);
    var hoursLeft = getHoursLeft(currentDate, eventDate);
    var minutesLeft = getRestLeft(currentDate.getMinutes(), eventDate.getMinutes());
    var secondsLeft = getRestLeft(currentDate.getSeconds(), eventDate.getSeconds());

    runCounter(daysLeft, hoursLeft, minutesLeft, secondsLeft);
};

setCounter();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @method isLeapYear -checks if the value returned Date.getFullYear() is leap year
 * @returns {boolean}
 */
Date.prototype.isLeapYear = function () {
    return this.getFullYear % 4 === 0 && this.getFullYear % 100 !== 0 || this.getFullYear % 400 === 0;
};

/**
 * @method getDayOfYear - returns the day of year basing on the values returned by Date.getFullYear(), Date.getMonth() and Date.getDate()
 * @returns {number}
 */
Date.prototype.getDayOfYear = function () {
    var months = [31, this.isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var result = 0;

    for (var i = 0; i < this.getMonth(); i++) {
        result += months[i];
    }

    result += this.getDate();
    return result;
};

exports.Date = Date;

/***/ })
/******/ ]);