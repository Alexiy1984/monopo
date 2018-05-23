document.addEventListener('DOMContentLoaded', function() {

  console.log('solution java-script  file initialized');

  const AllGet            = require('../functions/get/get-all');
  const AddClass          = require('../functions/class/class-add');
  const RemoveClass       = require('../functions/class/class-remove');
  const IsVisible         = require('../functions/conditional/is-visible');
  const ShowMenuPosition  = require('../blocks.default/main-hidden-menu/main-hidden-menu');

  let menubutton          = AllGet('.nav-menu__menu-button');
  let mainhiddenmenu      = AllGet('.main-hidden-menu');
  let logosvg             = AllGet('.logo__svg');
  let body                = AllGet('.body');
  let rownoheightelmts    = AllGet('.row_no-height .row__inner > *');
  let rowtransp2elmts     = AllGet('.row_transparent.jstr2 .row__inner > *');
  let rowfixed            = AllGet('.row_fixed.row_solutions_img');
  let rowfixedcentinner   = AllGet('.row_fixed.row_solutions_img .centered-block__inner');
  let menubuttonclicked   = false;

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

  console.log(rownoheightelmts);

  // function PreAnimProcess(eltarr) {
  //   for (let i = 0; i < rownoheightelmts.length; i++) { 
  //     for (let y = 1; y < arguments.length; y++) {
  //       AddClass(eltarr[i],arguments[y]);
  //     }
  //     if (IsVisible(eltarr[i])==true) {
  //       for (let y = 1; y < arguments.length; y++) {
  //         RemoveClass(eltarr[i],arguments[y]);
  //       }
  //     }
  //   }  
  // }

  // PreAnimProcess(rowtransp2elmts, '_opacity_full', '_translate_Y-2_5rem');

  for (let index = 0; index < rownoheightelmts.length; index++) {
    AddClass(rownoheightelmts[index],'_opacity_full');  
    AddClass(rownoheightelmts[index],'_translate_Y-2_5rem');
    if (IsVisible(rownoheightelmts[index])==true) {
      RemoveClass(rownoheightelmts[index],'_opacity_full');
      RemoveClass(rownoheightelmts[index],'_translate_Y-2_5rem');
    }
  }  

  document.addEventListener('scroll', function() {

    let wscrollTop = window.pageYOffset || document.documentElement.scrollTop;

    for (let index = 0; index < rownoheightelmts.length; index++) {
      if (IsVisible(rownoheightelmts[index])==true) {
        AddClass(rownoheightelmts[index],'_appear_animation');
        AddClass(rowtransp2elmts[index],'_appear_animation');
      }
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

