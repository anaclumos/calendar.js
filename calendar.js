const html = (s, ...args) => s.map((ss, i) => `${ss}${args[i] || ''}`).join('');

const NUMBER_OF_DAYS_IN_WEEK = 7;
const NAME_OF_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const renderCalendar = ($target) => {
  $target.innerHTML = getCalendarHTML();
};

const processDate = (day) => {
  const date = day.getDate();
  const month = day.getMonth();
  const year = day.getFullYear();
  return {
    lastMonthLastDate: new Date(year, month, 0),
    thisMonthFirstDate: new Date(year, month, 1),
    thisMonthLastDate: new Date(year, month + 1, 0),
    nextMonthFirstDate: new Date(year, month + 1, 1),
  };
};

const getCalendarHTML = () => {
  let today = new Date();
  let {
    lastMonthLastDate,
    thisMonthFirstDate,
    thisMonthLastDate,
    nextMonthFirstDate,
  } = processDate(today);
  let calendarContents = [];

  for (let d = 0; d < NUMBER_OF_DAYS_IN_WEEK; d++) {
    calendarContents.push(
      html`<div class="${NAME_OF_DAYS[d]} calendar-cell">
        ${NAME_OF_DAYS[d]}
      </div>`
    );
  }

  for (let d = 0; d < thisMonthFirstDate.getDay(); d++) {
    calendarContents.push(
      html`<div
        class="
          ${d % 7 === 0 ? 'sun' : ''}
          calendar-cell
          past-month
        "
      >
        ${lastMonthLastDate.getMonth() + 1}/${lastMonthLastDate.getDate() -
        thisMonthFirstDate.getDay() +
        d +
        1}
      </div>`
    );
  }

  for (let d = 0; d < thisMonthLastDate.getDate(); d++) {
    calendarContents.push(
      html`<div
        class="
          ${today.getDate() === d + 1 ? 'today' : ''}
          ${(thisMonthFirstDate.getDay() + d) % 7 === 0 ? 'sun' : ''}
          ${(thisMonthFirstDate.getDay() + d) % 7 === 6 ? 'sat' : ''}
          calendar-cell
          this-month
        "
      >
        ${d + 1} ${today.getDate() === d + 1 ? ' today' : ''}
      </div>`
    );
  }

  let nextMonthDaysToRender = 7 - (calendarContents.length % 7);

  for (let d = 0; d < nextMonthDaysToRender; d++) {
    calendarContents.push(
      html`<div
        class="
          ${(nextMonthFirstDate.getDay() + d) % 7 === 6 ? 'sat' : ''}
          calendar-cell
          next-month
        "
      >
        ${nextMonthFirstDate.getMonth() + 1}/${d + 1}
      </div>`
    );
  }
  return calendarContents.join('');
};
