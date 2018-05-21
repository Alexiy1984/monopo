module.exports = function GetCoords(element,attr) {
  var box = element.getBoundingClientRect();
  if (attr == 'left') {
    return box.left + pageXOffset;
  } else if (attr == 'top') {
    return box.top + pageYOffset;
  } else
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
