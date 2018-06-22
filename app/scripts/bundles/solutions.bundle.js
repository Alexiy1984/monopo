document.addEventListener('DOMContentLoaded', function() {

  console.log('solution java-script  file initialized');

  const AllGet            = require('../functions/get/get-all');
  const AddClass          = require('../functions/class/class-add');
  const RemoveClass       = require('../functions/class/class-remove');
  const ArrayToggleClass  = require('../functions/class/class-array-toggle.js');
  const IsVisible         = require('../functions/conditional/is-visible');
  const IsNodeList        = require('../functions/conditional/is-nodelist');
  const PreAnimProcess    = require('../functions/elem-actions/pre-anim');
  const ShowMenuPosition  = require('../blocks.default/main-hidden-menu/main-hidden-menu');

  let menubutton          = AllGet('.nav-menu__menu-button');
  let mainhiddenmenu      = AllGet('.main-hidden-menu');
  let logosvg             = AllGet('.logo__svg');
  let body                = AllGet('.body');
  //let rownoheightelmts    = AllGet('.row_no-height .row__inner > *');
  //let rowtransp2elmts     = AllGet('.js-anim-container > *');
  let rowfixed            = AllGet('.js-background');
  let rowfixedcentinner   = AllGet('.js-background .centered-block__inner');
  let menubuttonclicked   = false;
  
  rowtransp2elmts         = document.getElementsByClassName('js-anim-container');


  AddClass(menubutton,'nav-menu__menu-button_nohide');

  menubutton.onclick = function() {
    if (!menubuttonclicked) {
      menubuttonclicked = true;

      AddClass(mainhiddenmenu,'_appeared');
      RemoveClass(mainhiddenmenu,'_visibility_hidden');
      //ShowMenuPosition();
      logosvg.setAttribute("class","logo__svg_dark");
      AddClass(body,'_no-scroll');
    } else {
      menubuttonclicked = false;

      AddClass(mainhiddenmenu,'_visibility_hidden');
      RemoveClass(mainhiddenmenu,'_appeared');
      RemoveClass(body,'_no-scroll');
      logosvg.setAttribute("class","logo__svg");
    }
  }

  for (var i = 0; i < rowtransp2elmts.length; i++ ) {
    console.log(rowtransp2elmts[i].querySelectorAll('.js-element'));
    elemts = rowtransp2elmts[i].querySelectorAll('.js-element');
    PreAnimProcess(elemts, '_opacity_full', '_translate_Y-2_5rem');
  }

  //PreAnimProcess(rownoheightelmts, '_opacity_full', '_translate_Y-2_5rem');

  document.addEventListener('scroll', function() {

    let wscrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //ArrayToggleClass(rownoheightelmts, '_appear_animation', 'add');
    for (var i = 0; i < rowtransp2elmts.length; i++ ) {
      ArrayToggleClass(rowtransp2elmts[i].querySelectorAll('.js-element'), '_appear_animation', 'add');
    }  

    if (wscrollTop > document.documentElement.clientHeight) {
      rowfixed.style.background = '#1c1c1c';
      AddClass(rowfixedcentinner,'_visibility_hidden');
    } else {
      rowfixed.style.background = 'url(../media/images/pic_solutions_fv.jpg)';
      rowfixed.style.backgroundPosition = 'center';
      rowfixed.style.backgroundSize = 'cover';
      RemoveClass(rowfixedcentinner,'_visibility_hidden');
    }
  });
});

