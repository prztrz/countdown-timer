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

export {Date}