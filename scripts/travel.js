function startCalendars() {
  const calendars = document.querySelectorAll('.seeker__dates .seeker__value')
  Array.from(calendars, it => {
    const selector = `.seeker__dates .${it.getAttribute('class')}`
    flatpickr(selector, {
      dateFormat: 'd/m/y'
    })
  })
}

window.onload = function() {
  startCalendars()
  loadHTMLSection('travel-card')
}