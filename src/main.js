import {Date} from './modules/date.prototypes'

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

        console.log(currentDate.getDayOfYear())

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
    
    let daysDiv = document.getElementById('days');
    let hoursDiv = document.getElementById('hours');
    let minutesDiv = document.getElementById('minutes');
    let secondsDiv = document.getElementById('seconds');

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


        let daysString = (days < 10) ? `0${days}` : `${days}`;
        let hoursString = (hours < 10) ? `0${hours}` : `${hours}`;
        let minutesString = (minutes < 10) ? `0${minutes}` : `${minutes}`
        let secondsString = (seconds < 10) ? `0${seconds}` : `${seconds}`

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

setCounter();