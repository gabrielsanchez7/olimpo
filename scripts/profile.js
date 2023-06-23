function selectCategory() {
  const categories = document.querySelectorAll('.profile__option')
  Array.from(categories, it => {
    it.addEventListener('click', e => {
      const target = e.target
      target.classList.add('profile__option--active')

      const sibs = getSiblings(target)
      sibs.forEach(sib => sib.classList.remove('profile__option--active'))
    })
  })
}

window.onload = function() {
  selectCategory()
}