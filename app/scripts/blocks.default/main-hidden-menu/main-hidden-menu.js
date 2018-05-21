const AllGet = require('../../functions/get/get-all');

module.exports = function ShowMenuPosition () {
  let wscrollTop      = window.pageYOffset || document.documentElement.scrollTop;
  let mainHiddenMenu  = AllGet('.main-hidden-menu');
  mainHiddenMenu.setAttribute('style', 'position: absolute; top:' + wscrollTop + 'px;');
  console.log('wscrollTop: ' + wscrollTop);
}
