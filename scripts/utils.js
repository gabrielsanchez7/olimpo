/** Obtiene todos los hermanos de un elemento del DOM */
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