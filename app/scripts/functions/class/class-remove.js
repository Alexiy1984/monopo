module.exports = function RemoveClass(element, classname) {
  var reg = new RegExp("\\b"+ classname+"\\b","g");
  element.className = element.className.replace(reg," ");
}
