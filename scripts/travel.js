function startCalendars() {
  const calendars = document.querySelectorAll('.seeker__dates .seeker__value')
  Array.from(calendars, it => {
    const selector = `.seeker__dates .${it.getAttribute('class')}`
    flatpickr(selector, {
      dateFormat: 'd/m/y'
    })
  })
}

function getTravels() {
  const container = document.querySelector('.popular__list')
  container.innerHTML = ''

  Promise.all([
    fetch('./travel-card.html'),
    fetch('./data/travels.json')
  ]).then(responses => {
    return Promise.all(responses.map(res => {
      return res.url.includes('.html') ? res.text() : res.json()
    }))
  }).then(data => {
    const html = data[0]
    const travels = data[1]

    travels.forEach(it => {
      const div = document.createElement('div')
      container.appendChild(div)

      const replaced = html.replace('{{image}}', it.image)
        .replace('{{from}}', it.from)
        .replace('{{destination}}', it.destination)
        .replace('{{price}}', it.price)
        .replace('{{startDate}}', it.startDate)
        .replace('{{endDate}}', it.endDate)
        .replace('{{duration}}', it.duration)

      div.outerHTML = replaced
    })
  })
}

window.onload = function() {
  startCalendars()
  getTravels()
  loadHTMLSection('travel-card')
}