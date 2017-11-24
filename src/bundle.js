// components js
import PassForm from './components/form/PassForm';

// promise & fetch polyfills
// require('es6-promise').polyfill();
// require('whatwg-fetch');

// baseline app styles
require('./app/fonts/fonts.css');
require('./app/app.css');

// components styles
require.context('./components/', true, /\.css$/);

// people form component
const passForms = document.getElementsByClassName('pass-form');
for (let i = 0; i < passForms.length; i++) {
  new PassForm({ el: passForms[i] });
}
