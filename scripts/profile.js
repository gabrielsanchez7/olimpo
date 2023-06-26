function selectCategory() {
  const categories = document.querySelectorAll('.profile .options__item')
  Array.from(categories, it => {
    it.addEventListener('click', e => {
      const target = e.target
      target.classList.add('options__item--active')

      const sibs = getSiblings(target)
      sibs.forEach(sib => sib.classList.remove('options__item--active'))

      const content = target.getAttribute('data-option')
      setTabContent(content)
    })
  })
}

function setTabContent(content) {
  const contentToShow = document.querySelector(`[data-content="${content}"]`)
  const contentToHide = getSiblings(contentToShow)[0]

  contentToHide.style.opacity = '0'
  setTimeout(() => {
    contentToHide.style.display = 'none'
    contentToShow.style.display = 'block'
    setTimeout(() => {
      contentToShow.style.opacity = '1'
    }, 100)
  }, 250)
}

window.onload = function() {
  selectCategory()
}