/**
 * @method isLeapYear -checks if the value returned Date.getFullYear() is leap year
 * @returns {boolean}
 */
Date.prototype.isLeapYear = function() {
    return ((this.getFullYear%4 === 0 && this.getFullYear%100 !== 0) || this.getFullYear%400 ===0);
}

/**
 * @method getDayOfYear - returns the day of year basing on the values returned by Date.getFullYear(), Date.getMonth() and Date.getDate()
 * @returns {number}
 */
Date.prototype.getDayOfYear =  function() {
    const months = [31, this.isLeapYear() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let result = 0;

    for (let i = 0; i < this.getMonth(); i++) {
        result += months[i]
    }

    result += this.getDate();
    return result;
}

/**
 * @function getDaysLeft - returns the number of days remaining to the event
 * @param {object} currentDate - Date object instance constructed with current date
 * @param {object} eventDate - Date object instance constructed with the date of event
 * @return {number}
 */
const getDaysLeft = (currentDate, eventDate) => {
    let daysLeft = 0;

    if (currentDate.getFullYear() === eventDate.getFullYear()) {
        daysLeft = eventDate.getDayOfYear() - currentDate.getDayOfYear();
    } else {
        let yearDiff = eventDate.getFullYear() - currentDate.getFullYear();
        daysLeft = currentDate.isLeapYear() ? 366 - currentDate.getDayOfYear() : 365 - currentDate.getDayOfYear(); 

        for (let i = yearDiff-1; i>0; i--) {
            let temp = new Date(eventDate.getFullYear() - i);
            let toAdd = temp.isLeapYear ? 366 : 365;
            daysLeft += toAdd;
        }

        daysLeft += eventDate.getDayOfYear();
    }

    if ((currentDate.getHours() === eventDate.getHours() && currentDate.getMinutes() >= eventDate.getMinutes()) || currentDate.getHours() > eventDate.getHours()) {
        daysLeft--
    }

    return daysLeft;
}

/**
 * @function getHoursLeft - returns the number of hours below full day remaining to the event
 * @param {object} currentDate - Date object instance constructed with current date
 * @param {object} eventDate - Date object instance constructed with the date of event
 * @return {number}
 */
const getHoursLeft = (currentDate, eventDate) => {
    let hoursLeft = 0;

    if(currentDate.getHours() <= eventDate.getHours()) {
        hoursLeft = eventDate.getHours() - currentDate.getHours();
    } else {
        hoursLeft = 24 - currentDate.getHours() + eventDate.getHours();;
    }

    return hoursLeft;
}

/**
 * @function getRestsLeft - returns the number of minutes below full hour or second below full minute remaining to the event
 * @param {number} currentDate - value returned by date.getMinutes() or date.getSeconds()
 * @param {object} eventDate - value returned by date.getMinutes() or date.getSeconds()
 * @return {number}
 */
const getRestLeft = (currentDate, eventDate) => {
    let result = 0;
    if (currentDate <= eventDate) {
        result = eventDate - currentDate;
    } else {
        result = 60 - currentDate + eventDate;
    }

    return result;
}

/**
 * @function runCounter - appends value of days, hours, minutes and seconds remaining to the event to DOM elements, changes them every seconds. Clears interval if time to event is equal or less than 0 then sets final counter value to 0 days, 0 hours, 0 minutes, 0 seconds, 
 * @param {number} days - number of days remaining to the event
 * @param {number} hours - number of hours remaining to the event
 * @param {number} minutes - number of minutes remaining to the event
 * @param {number} seconds - number of seconds remaining to the event
 */
const runCounter = (days, hours, minutes, seconds) => {
    
    let $days = $('#days');
    let $hours = $('#hours');
    let $minutes = $('#minutes');
    let $seconds = $('#seconds');

    let interval = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            seconds = 59;
            minutes--;
        }

        if (minutes < 0) {
            minutes = 59
            hours--;
        }

        if (hours < 0) {
            hours = 23
            days--;
        }


        let daysString = (days < 10) ? `0${days}d` : `${days}d`;
        let hoursString = (hours < 10) ? `0${hours}h` : `${hours}h`;
        let minutesString = (minutes < 10) ? `0${minutes}m` : `${minutes}m`
        let secondsString = (seconds < 10) ? `0${seconds}s` : `${seconds}s`

        if (days < 0) {
            clearInterval(interval);
            daysString = '00d';
            hoursString = '00h';
            minutesString = '00m';
            secondsString = '00s';
        }

        $days.text(daysString);
        $hours.text(hoursString);
        $minutes.text(minutesString);
        $seconds.text(secondsString);
    }, 1000);

}

/**
 * @function setCounter - sets the number of days, hours, minutes, and seconds remaining to the event then runs runCounter()
 */
const setCounter = () => {
    let currentDate = new Date(); //Current date, I suggest to use external API's or server time functions and pass them value as an argument of Date() constructor
    const eventDate = new Date(2018,0,10,20,30,0) //Here you can set any date of the event
    let daysLeft = getDaysLeft(currentDate, eventDate);
    let hoursLeft = getHoursLeft(currentDate, eventDate);
    let minutesLeft = getRestLeft(currentDate.getMinutes(), eventDate.getMinutes());
    let secondsLeft = getRestLeft(currentDate.getSeconds(), eventDate.getSeconds());

    runCounter(daysLeft, hoursLeft, minutesLeft, secondsLeft)
}

export {setCounter}