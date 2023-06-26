importScript('./scripts/layout.js') // Sólo para desarrollo de maqueta
importScript('./scripts/glide.min.js')
importScript('./scripts/flatpickr.js')
importScript('./scripts/utils.js')

const url = window.location.pathname

if(url.includes('index')) {
  importScript('./scripts/home.js')
} else if(url.includes('bonus')) {
  importScript('./scripts/bonus.js')
} else if(url.includes('travel')) {
  importScript('./scripts/travel.js')
} else if(url.includes('products') || url.includes('experiences')) {
  importScript('./scripts/products.js')
} else if(url.includes('profile')) {
  importScript('./scripts/profile.js')
} else {
  importScript('./scripts/home.js')
}
