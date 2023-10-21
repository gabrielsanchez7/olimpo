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
 * Obtiene todos los elementos hermanos previos de un elemento del DOM
 * @param {HTMLElement} element Elemento del que se quiere obtener los hermanos anteriores
 * @returns Lista de elementos hermanos previos.
 */
function getPreviousSiblings(element) {
  let siblings = []
  while(element = element.previousElementSibling) {
    if(element.nodeType === 1) {
      siblings.push(element)
    }
  }
  return siblings
}

/**
 * Obtiene todos los elementos próximos de un elemento del DOM
 * @param {HTMLElement} element Elemento del que se quiere obtener los hermanos próximos
 * @returns Lista de elementos hermanos próximos
 */
function getNextSiblings(element) {
  let siblins = []
  let currentElement = element.nextElementSibling
  while(currentElement != null) {
    siblins.push(currentElement)
    currentElement = currentElement.nextElementSibling
  }
  return siblins
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
  const buttonClose = element.querySelector('.modal__action--secondary')

  const closeFunction = () => {
    content.removeAttribute('style')
    setTimeout(() => {
      element.style.removeProperty('opacity')
      setTimeout(() => element.removeAttribute('style'), 250)
    }, 50)
  }
  
  if(action == 'open') {
    element.style.display = 'flex'
    setTimeout(() => {
      element.style.opacity = '1'
      content.style.transform = 'translateY(0)'
    })
  } else {
    closeFunction()
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

function startTimer(container) {
  const timerHour = container.querySelector('.modal__time-box[data-type="hour"] p')
  const timerMin = container.querySelector('.modal__time-box[data-type="minute"] p')

  const maxMin = 59

  let tempHour = 5
  let tempMin = 0

  // start time
  timerHour.innerHTML = tempHour.toString().padStart(2, '0')
  timerMin.innerHTML = tempMin.toString().padStart(2, '0')

  const min = 0

  const interval = setInterval(() => {
    if(tempMin == 0) { tempHour-- }

    if(tempHour >= 0 && tempMin >= 0) {
      tempMin--
      if(tempMin < 0) { tempMin = maxMin }
    }

    timerHour.innerHTML = tempHour.toString().padStart(2, '0')
    timerMin.innerHTML = tempMin.toString().padStart(2, '0')

    if(tempHour == min && tempMin == min) {
      clearInterval(interval)
    }
  }, 60000)
}

function handleSwitch() {
  const switchUI = document.querySelectorAll('.switch')
  switchUI.forEach(it => {
    it.addEventListener('click', e => {
      const status = it.getAttribute('data-status')
      it.setAttribute('data-status', status == 'on' ? 'off' : 'on')
      it.classList.toggle('switch--on')
    })
  })
}

function floatingMenu() {
  window.addEventListener('scroll', () => {
    const top = window.scrollY
    const header = document.querySelector('header')
    const main = document.querySelector('main')

    if(top > 70) {
      header.style.position = 'fixed'
      main.style.paddingTop = '70px'
    } else {
      header.removeAttribute('style')
      main.removeAttribute('style')
    }
  })
}