document.addEventListener('DOMContentLoaded', function() {

  console.log('works java-script  file initialized');
  
  //function IdGet(idname) {return typeof i == 'object' ? i : document.getElementById(idname);}

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

  // function GetNumeredIds(idPrefix, num) {
  //   let numeredIds = [];
  //   for (let index = 1; index <= num; index++) {
  //     numeredIds[index] = IdGet( idPrefix + index);
  //   }
  //   return numeredIds
  // }

  function ArrayAddRemoveClass(array, classname) {
    for (let index = 0; index < array.length; index++) {
      if (IsVisible(array[index])) {
        RemoveClass(array[index], classname);
      } else  AddClass(array[index], classname);
    }
  }

  function SwitchClassesOnScroll(scroll, element, attrib) {
    if (scroll<0.10) {
      element.setAttribute("class", attrib+"01");
    } else if (scroll<0.25) {
      element.setAttribute("class", attrib+"12_5");
    } else if (scroll<0.50) {
      element.setAttribute("class", attrib+"25");
    } else if (scroll<0.60) {
      element.setAttribute("class", attrib+"50");
    } else if (scroll<0.70) {
      element.setAttribute("class", attrib+"62_5");
    } else if (scroll<=0.80) {
      element.setAttribute("class", attrib+"75");
    } else if (scroll<=0.90) {
      element.setAttribute("class", attrib+"87_5");
    } else element.setAttribute("class", attrib+"100");
  }

  window.onload = function () {

    //declaration START
    let animatedcircle    = AllGet('.bg-full-window__circle-div__svg_perc');
    let scrollheight      = document.documentElement.scrollHeight;
    let heightoffset      = window.pageYOffset + document.documentElement.clientHeight/3;
    let scrollmarker      = ((heightoffset/scrollheight)+0.1).toFixed(2);
    let worksmenuitems    = AllGet('.works-menu__item');
    let logosvg           = AllGet('.logo__svg');
    let menubutton        = AllGet('.nav-menu__menu-button');
    let menubuttonclicked = false;
    let workarealinks     = AllGet('.works-area__inner__link');
    //declaration END
    
    SwitchClassesOnScroll(scrollmarker, animatedcircle, "bg-full-window__circle-div__svg bg-full-window__circle-div__svg_perc bg-full-window__circle-div__svg_perc-");
    
    // эксп. код START

    let linksDigital  = [4 , 9 ];
    let linksBrand    = [10, 13]; 
    let linksCompany  = [1 , 8 ];
    let linksVideo    = [2 , 7 ];
    let linksPhoto    = [5 , 10];
    let linksInitial  = [0 , 6 ];
    let linksTokio    = [3 , 12];

    function ElementsArrangement(linksnumbers, linksarray) {
      indexVis = 0;
      for (let index = 0; index < linksarray.length; index++) {
        AddClass(linksarray[index],'block-hide');
        for (let y = 0; y < linksnumbers.length; y++) {  
         if( index == linksnumbers[y]) {
          RemoveClass(linksarray[index],'block-hide');    
         }
        }
        arrvis = linksarray[index].className.split(" ");
        if (arrvis.indexOf('block-hide') == -1) {
          ++indexVis;
          if (indexVis % 2 == 0) {
            AddClass(linksarray[index], 'works-area__inner__link_right');
            RemoveClass(linksarray[index], 'works-area__inner__link_left');  
          } else {
            AddClass(linksarray[index], 'works-area__inner__link_left');
            RemoveClass(linksarray[index], 'works-area__inner__link_right');  
          }
        }
      };
    }

    for (let index = 0; index < worksmenuitems.length; index++) {
      worksmenuitems[index].onclick = function() {
        let showeditems = [];
        let indexArr;   
        for (let index = 0; index < worksmenuitems.length; index++) {
          RemoveClass(worksmenuitems[index],'works-menu__item_selected'); 
        }
        AddClass(worksmenuitems[index],'works-menu__item_selected');
        switch (index) {
          case 0:
          for (let index2 = 0; index2 < workarealinks.length; index2++) {
            try {
              RemoveClass(workarealinks[index2],'block-hide');
              if (index2 % 2 == 0) {
                AddClass(workarealinks[index2],'works-area__inner__link_left');
                RemoveClass(workarealinks[index2],'works-area__inner__link_right');
              } else {
                AddClass(workarealinks[index2],'works-area__inner__link_right');
                RemoveClass(workarealinks[index2],'works-area__inner__link_left');
              }
            } catch (e) {
              console.log(workarealinks[index2] + ' : ' + index2 );
              console.log(workarealinks.length);
              if (index2 > 15) break;
            }
          }
          break;
          case 1:
            ElementsArrangement(linksDigital  ,workarealinks);
            ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');
          break;
          case 2:
            ElementsArrangement(linksBrand    ,workarealinks);
            ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');
          break;
          case 3:
            ElementsArrangement(linksCompany  ,workarealinks);
            ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');
          break;
          case 4:
            ElementsArrangement(linksVideo    ,workarealinks);
            ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');
          break;
          case 5:
            ElementsArrangement(linksPhoto    ,workarealinks);
            ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');
          break;
          case 6:
            ElementsArrangement(linksInitial  ,workarealinks);
            ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');
          break;
          case 7:
            ElementsArrangement(linksTokio    ,workarealinks);
            ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');
          break;
          default: console.log('do nothing');
          break;
        } 
      }
    }

    // эксп. код END

    logosvg.setAttribute("style","fill: #fff");

    AddClass(menubutton,'nav-menu__menu-button_nohide');
    
    ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');

    menubutton.onclick = function() {

      let minsizemenu   = AllGet('.min-size-menu');
      let logosvg       = AllGet('.logo__svg');
      let worksarea     = AllGet('.works-area');
      let worksmenu     = AllGet('.works-menu');
      let menuLines     = AllGet('.nav-menu__menu-button__line');
      let bootomrottext = AllGet('.bottom-rotated-text');
      let bottomarrow   = AllGet('.bottom-arrow');
      
      if (!menubuttonclicked) {
        RemoveClass(minsizemenu,'block-hide');
        AddClass(worksarea,'block-hide');
        AddClass(worksmenu,'block-hide');
        AddClass(bootomrottext,'block-hide');
        AddClass(bottomarrow,'block-hide');
        AddClass(minsizemenu,'appeared');
        menuLines.forEach(element => {AddClass(element,'nav-menu__menu-button__line_dark')});
        logosvg.setAttribute("style","fill: #000");
        menubuttonclicked = true;
      } else {
        AddClass(minsizemenu,'block-hide');
        RemoveClass(worksarea,'block-hide');
        RemoveClass(worksmenu,'block-hide');
        RemoveClass(bootomrottext,'block-hide');
        RemoveClass(bottomarrow,'block-hide');
        RemoveClass(minsizemenu,'appeared');
        menuLines.forEach(element => {RemoveClass(element,'nav-menu__menu-button__line_dark')});
        logosvg.setAttribute("style","fill: #fff");
        menubuttonclicked = false;
      } 
    }
  }

  window.onscroll = function() {

    let workarealinks   = AllGet('.works-area__inner__link');
    let scrollheight    = document.documentElement.scrollHeight;
    let heightoffset    = window.pageYOffset + document.documentElement.clientHeight/3;
    let animatedcircle  = AllGet('.bg-full-window__circle-div__svg_perc');
    let scrollmarker    = ((heightoffset/scrollheight)+0.1).toFixed(2);

    SwitchClassesOnScroll(scrollmarker, animatedcircle, "bg-full-window__circle-div__svg bg-full-window__circle-div__svg_perc bg-full-window__circle-div__svg_perc-");
  
    ArrayAddRemoveClass(workarealinks, 'works-area__inner__link_hidden');

  }

});
