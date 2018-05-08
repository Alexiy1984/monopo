document.addEventListener('DOMContentLoaded', function() {

  console.log('works java-script  file initialized');
  
  function IdGet(idname) {return typeof i == 'object' ? i : document.getElementById(idname);}

  function ClassGet(classname) {return document.getElementsByClassName(classname);}

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

  function GetNumeredIds(idPrefix, num) {
    let numeredIds = [];
    for (let index = 1; index <= num; index++) {
      numeredIds[index] = IdGet( idPrefix + index);
    }
    return numeredIds
  }

  function ArrayAddRemoveClass(array, classname) {
    for (let index = 1; index < array.length; index++) {
      if (IsVisible(array[index])) {
        RemoveClass(array[index], classname);
      } else  AddClass(array[index], classname);
    }
  }

  let linksarray = [];

  window.onload = function () {

    let logosvg = IdGet('JS-logo-svg');
    logosvg.setAttribute("style","fill: #fff");

    let menubutton = IdGet('JS-menu-button');
    let menubuttonclicked = false;
    // console.log(menubuttonclicked);
    // console.log(menubutton);

    AddClass(menubutton,'nav-menu__menu-button_nohide');

    let workarealinks = GetNumeredIds('JS-works-area-link-',8);

    for (let index = 3; index < workarealinks.length; index++) {
      AddClass(workarealinks[index],'works-area__inner__link_hidden');
    }

    ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');

    menubutton.onclick = function() {

      let minsizemenu = IdGet('JS-min-size-menu');
      let logosvg = IdGet('JS-logo-svg');
      let worksarea = IdGet('JS-works-area');
      let worksmenu = IdGet('JS-works-menu');
      let menuLines = GetNumeredIds('line-',3);
      // let logosvg = IdGet('JS-logo-svg');
      
      if (!menubuttonclicked) {
        RemoveClass(minsizemenu,'block-hide');
        AddClass(worksarea,'block-hide');
        AddClass(worksmenu,'block-hide');
        AddClass(minsizemenu,'appeared');
        menuLines.forEach(element => {AddClass(element,'nav-menu__menu-button__line_dark')});
        logosvg.setAttribute("style","fill: #000");
        menubuttonclicked = true;
      } else {
        AddClass(minsizemenu,'block-hide');
        RemoveClass(worksarea,'block-hide');
        RemoveClass(worksmenu,'block-hide');
        RemoveClass(minsizemenu,'appeared');
        menuLines.forEach(element => {RemoveClass(element,'nav-menu__menu-button__line_dark')});
        logosvg.setAttribute("style","fill: #fff");
        menubuttonclicked = false;
      }
      
    }

  }

  window.onscroll = function() {

    let workarealinks = GetNumeredIds('JS-works-area-link-',8);
    let scrollheight = document.documentElement.scrollHeight;
    let heightoffset = window.pageYOffset + document.documentElement.clientHeight;
    let animatedcircle = IdGet('JS-circle-animated');

    console.log((heightoffset/scrollheight).toFixed(2));

    let scrollmarker = (heightoffset/scrollheight).toFixed(2);

    if (scrollmarker <= 0.5) {
      animatedcircle.setAttribute("class", "bg-full-window__circle-div__svg bg-full-window__circle-div__svg_perc bg-full-window__circle-div__svg_perc-25");
    } else if ((scrollmarker > 0.5)&&(scrollmarker < 0.6)) {
      animatedcircle.setAttribute("class", "bg-full-window__circle-div__svg bg-full-window__circle-div__svg_perc bg-full-window__circle-div__svg_perc-50");
    } else if ((scrollmarker > 0.6)&&(scrollmarker < 0.7)) {
      animatedcircle.setAttribute("class", "bg-full-window__circle-div__svg bg-full-window__circle-div__svg_perc bg-full-window__circle-div__svg_perc-75");
    } else if (scrollmarker > 0.7) {
      animatedcircle.setAttribute("class", "bg-full-window__circle-div__svg bg-full-window__circle-div__svg_perc bg-full-window__circle-div__svg_perc-100");
    } 
    

    ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');

      // for (let index = 1; index < workarealinks.length; index++) {
      //   if (IsVisible(workarealinks[index])) {
      //     RemoveClass(workarealinks[index] ,'works-area__inner__link_hidden');
      //   } else  AddClass(workarflealinks[index] ,'works-area__inner__link_hidden');
      // }
      
  }


});
