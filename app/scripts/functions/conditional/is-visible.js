const GetCoords = require('../get/get-coord');

module.exports = function IsVisible(element) {
  let wscrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let elemtop = GetCoords(element,'top');
  let elemtopwheight = elemtop + element.offsetHeight;
  let wscrollHeight = document.documentElement.clientHeight;
  return ((elemtopwheight <= wscrollTop + wscrollHeight) && (elemtop >= wscrollTop ));
}





