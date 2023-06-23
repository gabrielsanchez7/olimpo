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

function selectBonus() {
  const bonusCards = document.querySelectorAll('.bonus-card')
  Array.from(bonusCards, it => {
    it.addEventListener('click', () => {
      location.href = "./bonus-detail.html"
    })
  })
}

window.onload = function() {
  selectCategory()
  loadHTMLSection('bonus-card', selectBonus)
}