function ClassGet(classname) {return document.getElementsByClassName(classname);}

function GetCoords(element,attr) {
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

function IsVisible(element) {
  let wscrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let elemtop = GetCoords(element,'top');
  let elemtopwheight = elemtop + element.offsetHeight;
  let wscrollHeight = document.documentElement.clientHeight;
  return ((elemtopwheight <= wscrollTop + wscrollHeight) && (elemtop >= wscrollTop ));
}

function ArrayAddRemoveClass(array, classname) {
  for (let index = 0; index < array.length; index++) {
    if (IsVisible(array[index])) {
      RemoveClass(array[index], classname);
    } else  AddClass(array[index], classname);
  }
}



