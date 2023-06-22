/**
 * Crea una etiqueta script para importar un archivo en el archivo main.js
 * @param {string} url - Ubicación del script a importar
 * @param {function} callback - Función a ejecutar al termino de la carga del script
 */
function importScript(url, callback) {
  const scriptTag = document.createElement("script")
  scriptTag.src = url
  scriptTag.onload = callback || function() {}
  document.body.appendChild(scriptTag)
}