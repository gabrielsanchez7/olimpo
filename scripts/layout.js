/**
 * Carga el contenido de un archivo HTML en su etiqueta correspondiente, evitará duplicar los headers
 * y footer en todos los archivos.
 * @param {string} tag - Etiqueta a reemplazar, el nombre del archivo debe ser igual al de la etiqueta.
 * @param {function} callback - Función a ejecutar al termino de la carga del HTML.
 */
function loadHTMLSection(tag, callback) {
  const sectionTag = document.querySelector(tag)
  fetch(`./${tag}.html`)
    .then(response => response.text())
    .then(html => {
      sectionTag.outerHTML = html
      callback() || function() {}
    })
}

loadHTMLSection('header', callbacksLayout)
loadHTMLSection('footer', callbacksLayout)

/**
 * Crea el alto mínimo del cuerpo de la página y envía el footer al final dependiendo del alto actual de la ventana
 * y del tamaño actual del header y footer.
 * @param {double} headerHeight - Altura actual de la etiqueta header.
 * @param {double} footerHeight - Altura actual de la etiqueta footer.
 */
function contentSize(headerHeight, footerHeight) {
  if(headerHeight > 0 && footerHeight > 0) {
    const windowHeight = window.innerHeight
    const main = document.querySelector('main')
    main.style.minHeight = `${windowHeight - headerHeight - footerHeight}px`
  }
}

/**
 * Proporciona la clase de diseño activo al menú seleccionado.
 */
function activeMenu() {
  const url = window.location.href
  const itemClass = window.innerWidth <= 1000 ? '.header__mobile-item' : '.header__menu-item'
  const menuItems = document.querySelectorAll(itemClass)

  Array.from(menuItems).find(it => {
    const data = it.getAttribute('data-menu')
    if(url.includes(data)) {
      if(window.innerWidth <= 1000) {
        it.classList.add('header__mobile-item--active')
        console.log('here')
      } else {
        it.classList.add('header__menu-item--active')
      }
    }
  })
}

/**
 * Agrega un padding al final de la etiqueta body cuando la pantalla es igual o menor a 1000px
 * y existe el menú inferior para modo mobile
 */
function footerPadding() {
  if(window.innerWidth <= 1000) {
    const menuMobileHeight = document.querySelector('.header__mobile').offsetHeight
    const footer = document.querySelector('.footer__rights')
    footer.style.paddingBottom = `${menuMobileHeight}px`
  }
}

/**
 * Funciones que se ejecutan cuando la carga del header y el footer ha terminado.
 */
function callbacksLayout() {
  const headerHeight = document.querySelector('header').offsetHeight
  const footerHeight = document.querySelector('footer').offsetHeight

  if(headerHeight > 0 && footerHeight > 0) {
    contentSize(headerHeight, footerHeight)
    activeMenu()
    footerPadding()
  }
}