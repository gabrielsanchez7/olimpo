/**
 * Obtiene todos los hermanos de un elemento del DOM
 * @param {HTMLElement} element - Elemento del que se quiere obtener los hermanos
 * @param {String} selector - Solo se retornará los hermanos con el presente selector
 * @returns Lista de elemetos hermanos
 */
function getSiblings(element, selector = null) {
  let siblings = []

  if(!element.parentNode) { return siblings }

  const allChilds = element.parentNode.children
  Array.from(allChilds, child => {
    if(child != element && !child.matches(selector)) { siblings.push(child) }
  })

  return siblings
}

/**
 * Convierte un tipo de dato numérico a formato de moneda
 * @param {number} currencyString - Valor numérico
 * @returns Valor en tipo moneda
 */
function toCurrency(currencyString = 0) {
  return currencyString.toLocaleString()
}

/**
 * Genera un valor random
 * @returns Valor random
 */
function random() {
  return Math.random() - 0.5
}

/**
 * Abre o cierra el modal dependiendo del contexto
 * @param {HTMLElement} element - Modal sobre el que se ejecutará la operación
 * @param {String} action - 'open' o 'close' para abrir o cerrar el modal
 */
function handleModal(element, action) {
  const content = element.querySelector('.modal__content')
  const buttonClose = element.querySelector('.modal__close')

  if(action == 'open') {
    element.style.display = 'flex'
    setTimeout(() => {
      element.style.opacity = '1'
      content.style.transform = 'translateY(0)'
    })
  } else {
    closeFunction()
  }

  const closeFunction = () => {
    content.removeAttribute('style')
    setTimeout(() => {
      element.style.removeProperty('opacity')
      setTimeout(() => element.removeAttribute('style'), 250)
    }, 50)
  }

  buttonClose.addEventListener('click', () => closeFunction())
}

function openProductDetail() {
  const buttons = document.querySelectorAll('.product-card__open')
  const modal = document.querySelector('.modal')
  const addButton = document.querySelector('.modal__options .button')
  
  Array.from(buttons, it => {
    it.addEventListener('click', () => {
      handleModal(modal, 'open')
    })
  })

  addButton.addEventListener('click', e => {
    const target = e.target
    const link = target.nextElementSibling

    modal.querySelector('.modal__added').style.display = 'flex'
    target.style.display = 'none'
    link.style.display = 'block'
  })
}

function handleAccordion() {
  const accordions = document.querySelectorAll('.accordion__handler')
  Array.from(accordions, accordion => {
    accordion.addEventListener('click', e => {
      const target = e.target
      const container = target.closest('.accordion')
      const content = container.querySelector('.accordion__content')
      const contentHeight = content.querySelector('div').scrollHeight
      const isActive = container.classList.contains('accordion--active')
      const icon = container.querySelector('.fa-solid')

      if(!isActive) {
        container.classList.add('accordion--active')
        content.style.height = `${contentHeight}px`
        icon.classList.remove('fa-plus')
        icon.classList.add('fa-minus')
      } else {
        container.classList.remove('accordion--active')
        content.style.removeProperty('height')
        icon.classList.remove('fa-minus')
        icon.classList.add('fa-plus')
      }

    })
  })
}