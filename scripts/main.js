importScript('./scripts/layout.js') // Sólo para desarrollo de maqueta
importScript('./scripts/utils.js')

const url = window.location.href

if(url.includes('bonus')) {
  importScript('./scripts/bonus.js')
} else if(url.includes('profile')) {
  importScript('./scripts/profile.js')
}
