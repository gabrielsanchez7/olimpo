function selectCategory() {
  const categories = document.querySelectorAll('.bonus__option')
  Array.from(categories, it => {
    it.addEventListener('click', e => {
      const target = e.target
      target.classList.add('bonus__option--active')

      const sibs = getSiblings(target)
      sibs.forEach(sib => sib.classList.remove('bonus__option--active'))
    })
  })
}

window.onload = function() {
  selectCategory()
  loadHTMLSection('bonus-card')
}