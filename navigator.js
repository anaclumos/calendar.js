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
  <button class="move-month-button" onclick="previousMonthButtonDidPress()">← ${MONTHS[today.getMonth() == 0 ? 11 : today.getMonth() - 1]} ${today.getMonth() <= 0 ? today.getFullYear() - 1 : today.getFullYear()}</button>
  <h1 class="month-display">${MONTHS[today.getMonth()]}<br/>${today.getFullYear()}</h1>
  <button class="move-month-button" onclick="nextMonthButtonDidPress()">${MONTHS[today.getMonth() == 11 ? 0 : today.getMonth() + 1]} ${today.getMonth() >= 11 ? today.getFullYear() + 1 : today.getFullYear()} →</button>
  `
}

const previousMonthButtonDidPress = () => {
  displayDate.setMonth(displayDate.getMonth() - 1)
  renderNavigator(document.getElementById('navigator'), displayDate)
  renderCalendar(document.getElementById('calendar'), displayDate)
}

const nextMonthButtonDidPress = () => {
  displayDate.setMonth(displayDate.getMonth() + 1)
  renderNavigator(document.getElementById('navigator'), displayDate)
  renderCalendar(document.getElementById('calendar'), displayDate)
}
