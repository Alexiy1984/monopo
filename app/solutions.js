document.addEventListener('DOMContentLoaded', function() {

  console.log('solution java-script  file initialized');

  function ClassGet(classname) {return document.getElementsByClassName(classname);}

  function AllGet(tagname) {
    let element = document.querySelectorAll(tagname);
    if (element.length <= 1) {
      return document.querySelector(tagname);
    } else return document.querySelectorAll(tagname);
  }

  function RemoveClass(element, classname) {
    var reg = new RegExp("\\b"+ classname+"\\b","g");
    element.className = element.className.replace(reg," ");
  }

  function AddClass(element, classname) {
    var arr;
    arr = element.className.split(" ");
    if (arr.indexOf(classname) == -1) {
      element.className += " " + classname;
    }
    element.className = element.className.replace(/\s+/g," ");
  }

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

  let menubutton = AllGet('.nav-menu__menu-button');

  AddClass(menubutton,'nav-menu__menu-button_nohide');

});
