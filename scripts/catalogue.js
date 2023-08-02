function getCategories(module) {
  const container = document.querySelector('.categories .container')
  container.innerHTML = ''
  
  Promise.all([
    fetch('./category-filter.html'),
    fetch('./data/categories.json')
  ]).then(responses => {
    return Promise.all(responses.map(res => {
      return res.url.includes('.html') ? res.text() : res.json()
    }))
  }).then(data => {
    const html = data[0]
    const categories = data[1].filter(it => it.module == module)
    
    categories.forEach(it => {
      const div = document.createElement('div')
      container.appendChild(div)

      const replaced = html.replace('{{icon}}', it.icon)
        .replace('{{name}}', it.name)

      div.outerHTML = replaced
    })

    const buttons = document.querySelectorAll('.category-filter')
    
    buttons.forEach(button => {
      button.addEventListener('click', e => {
        const target = e.target
        const sibs = getSiblings(target)
        
        target.classList.add('category-filter--active')
        sibs.forEach(it => it.classList.remove('category-filter--active'))
      })
    })
  })
}

window.onload = function() {
  getCategories('products')
}