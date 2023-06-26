function startCarousel() {
  const carousels = document.querySelectorAll('.glide')
  Array.from(carousels, it => {
    const isHome = it.classList.contains('banner__carousel') ? true : false
    const carousel = new Glide(it, {
      autoplay: '4000',
      type: 'carousel',
      perView: isHome ? 1 : 4,
      gap: isHome ? 0 : 30
    })
  
    carousel.mount()
  })
}

/**
 * Obtiene productos almacenados en el json de productos aplicando los filtros necesarios
 * @param {String} category - Filtro por categoría
 * @param {String} price - Filtro por puntos actuales
 * @param {String} sort - Filtro de orden
 */
function getProducts(category, price, sort) {
  const container = document.querySelector('.gallery__list')
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
    let products = data[1]

    if(category != null) {
      products = products.filter(it => it.category == category)
    }

    if(price != null) {
      products = products.filter(it => it.price <= price)
    }

    if(sort == 'AZ') {
      products.sort((a, b) => a.name.localeCompare(b.name))
    } else if(sort == 'ZA') {
      products.sort((a, b) => b.name.localeCompare(a.name))
    } else if(sort == '01') {
      products.sort((a, b) => a.price - b.price)
    } else if(sort == '10') {
      products.sort((a, b) => b.price - a.price)
    } else {
      products.sort(random)
    }

    products = products.slice(0, 8)
    
    products.forEach(it => {
      const div = document.createElement('div')
      container.appendChild(div)
      
      const replaced = html.replace('{{image}}', it.image)
        .replace('{{brand}}', it.brand)
        .replace('{{name}}', it.name)
        .replace('{{price}}', toCurrency(it.price))
        .replace('{{oldPrice}}', toCurrency(it.oldPrice))
      
      div.outerHTML = replaced
    })
  })
}

/**
 * Agrega el listener para la selección de categorías
 */
function selectCategory() {
  const categories = document.querySelectorAll('.categories .categories__item')
  let filterCategory = null
  let filterPrice = null
  let filterSort = null
  
  Array.from(categories, category => {
    category.addEventListener('click', e => {
      const target = e.target
      const siblings = getSiblings(target)
      target.classList.add('categories__item--active')
      siblings.forEach(it => it.classList.remove('categories__item--active'))
      
      filterCategory = target.getAttribute('data-category')
      getProducts(filterCategory, filterPrice)
    })
  })

  const currentPrice = document.querySelector('.gallery__points')
  currentPrice.addEventListener('click', e => {
    const target = e.target
    filterPrice = 2000

    target.classList.add('gallery__points--active')
    getProducts(filterCategory, filterPrice)
  })

  const sortButton = document.querySelector('.gallery__sort')
  sortButton.addEventListener('change', () => {
    filterSort = sortButton.value
    getProducts(filterCategory, filterPrice, filterSort)
  })
}

window.onload = function() {
  startCarousel()
  getProducts()
  selectCategory()
  loadHTMLSection('product-card')
}