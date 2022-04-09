const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

let displayDate = new Date()

const renderNavigator = ($target, today) => {
  let html = getNavigatorHTML(today)
  console.log(html)
  // minify html
  html = html.replace(/\n/g, '')
  // replace multiple spaces with single space
  html = html.replace(/\s{2,}/g, ' ')
  $target.innerHTML = html
}

const getNavigatorHTML = (today) => {
  return html`
    <div class="navigator">
      <button class="previous-month-button" onclick="previousMonthButtonDidPress()">← ${MONTHS[today.getMonth() == 0 ? 11 : today.getMonth() - 1]} ${today.getMonth() <= 0 ? today.getFullYear() - 1 : today.getFullYear()}</button>
      <div class="month">${MONTHS[today.getMonth()]} ${today.getFullYear()}</div>
      <button class="next-month-button" onclick="nextMonthButtonDidPress()">${MONTHS[today.getMonth() == 11 ? 0 : today.getMonth() + 1]} ${today.getMonth() >= 11 ? today.getFullYear() + 1 : today.getFullYear()} →</button>
    </div>
  `
}

const previousMonthButtonDidPress = () => {
  displayDate.setMonth(displayDate.getMonth() - 1)
  renderNavigator(document.querySelector('.navigator'), displayDate)
  renderCalendar(document.getElementById('calendar'), displayDate)
}

const nextMonthButtonDidPress = () => {
  displayDate.setMonth(displayDate.getMonth() + 1)
  renderNavigator(document.querySelector('.navigator'), displayDate)
  renderCalendar(document.getElementById('calendar'), displayDate)
}
