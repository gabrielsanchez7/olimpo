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

window.onload = function() {
  startCarousel()
  loadHTMLSection('product-card')
}