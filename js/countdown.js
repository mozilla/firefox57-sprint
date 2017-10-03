(function() {
  'use strict';

  var END_DATE = new Date('2017-10-02');
  var ONE_SECOND = 1000;
  var ONE_MINUTE = ONE_SECOND * 60;
  var ONE_HOUR = ONE_MINUTE * 60;
  var ONE_DAY = ONE_HOUR * 24;
  var countdownElement = document.querySelector('#countdown');

  // Do not use UTC, but local timezone
  END_DATE = END_DATE.setMinutes(END_DATE.getMinutes() + END_DATE.getTimezoneOffset());

  function count() {
    var today = new Date();
    var distance = END_DATE - today;
    if (distance < 0) {
        clearInterval(interval);
        var heroUnit = document.querySelector('.hero-unit');
        if (heroUnit) {
          heroUnit.removeNode(countdownElement);
        }

        return;
    }

    var countDays = Math.floor(distance / ONE_DAY);
    var countHours = Math.floor((distance % ONE_DAY) / ONE_HOUR);
    var countMinutes = Math.floor((distance % ONE_HOUR) / ONE_MINUTE);
    var countSeconds = Math.floor((distance % ONE_MINUTE) / ONE_SECOND);

    var formatted = countDays + ' days ' + countHours + ' hours ' + countMinutes + ' minutes ' + countSeconds + ' seconds';
    countdownElement.textContent = formatted;
    countdownElement.classList.remove('hidden');
  }

  var interval = setInterval(function() {
    count();
  }, 1000);

  count();
})();
