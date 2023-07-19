function startCarousel() {
  const carousels = document.querySelectorAll('.glide')
  Array.from(carousels, it => {
    const isBanner = it.classList.contains('banner__carousel') ? true : false

    const glideConfig = {
      autoplay: '4000',
      type: 'carousel',
      perView: isBanner ? 1 : 4,
      gap: isBanner ? 0 : 30
    }

    if(!isBanner) {
      glideConfig.peek = {
        before: 0,
        after: 150
      }
      glideConfig.breakpoints = {
        1280: { perView: 3, peek: { before: 0, after: 180 } },
        950: { perView: 2, peek: { before: 0, after: 200 } },
        650: { perView: 1, peek: { before: 0, after: 220 } },
        500: { perView: 1, peek: { before: 0, after: 150 }, gap: 15 }
      }
    }

    const carousel = new Glide(it, glideConfig)
    carousel.mount()
  })
}

function getPromotions() {
  const container = document.querySelector('.promotions .glide__slides')
  container.innerHTML = ''

  Promise.all([
    fetch('./product-card.html'),
    fetch('./data/products.json')
  ]).then(responses => {
    return Promise.all(responses.map(res => {
      return res.url.includes('.html') ? res.text() : res.json()
    }))
  }).then(data => {
    const html = data[0]
    const products = data[1].slice(0, 8)

    products.forEach(it => {
      const li = document.createElement('li')
      li.classList.add('glide__slide')

      const div = document.createElement('div')
      li.appendChild(div)

      const replaced = html.replace('{{image}}', it.image)
        .replace('{{brand}}', it.brand)
        .replace('{{name}}', it.name)
        .replace('{{price}}', toCurrency(it.price))
        .replace('{{oldPrice}}', toCurrency(it.oldPrice))

      div.outerHTML = replaced
      container.appendChild(li)
    })

    startCarousel()
    openProductDetail()
  })
}

function selectCategory() {
  const categories = document.querySelectorAll('.home .option')
  Array.from(categories, it => {
    it.addEventListener('click', e => {
      const target = e.target
      target.classList.add('option--active')

      const sibs = getSiblings(target)
      sibs.forEach(sib => sib.classList.remove('option--active'))

      const content = target.getAttribute('data-option')
      setTabContent(content)
    })
  })
}

function setTabContent(content) {
  const contentToShow = document.querySelector(`[data-content="${content}"]`)
  const contentToHide = getSiblings(contentToShow)

  Array.from(contentToHide, content => {
    content.style.opacity = '0'
    setTimeout(() => {
      content.style.display = 'none'
      contentToShow.style.display = 'block'
      setTimeout(() => {
        contentToShow.style.opacity = '1'
      }, 100)
    }, 250)
  })

}

window.onload = function() {
  selectCategory()
  // getPromotions()
}