module.exports = function AddClass(element, classname) {
  var arr;
  arr = element.className.split(" ");
  if (arr.indexOf(classname) == -1) {
    element.className += " " + classname;
  }
  element.className = element.className.replace(/\s+/g," ");
}
