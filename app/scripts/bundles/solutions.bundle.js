document.addEventListener('DOMContentLoaded', function() {

  console.log('solution java-script  file initialized');

  const AllGet            = require('../functions/get/get-all');
  const AddClass          = require('../functions/class/class-add');
  const RemoveClass       = require('../functions/class/class-remove');
  const ShowMenuPosition  = require('../blocks.default/main-hidden-menu/main-hidden-menu');

  let menubutton          = AllGet('.nav-menu__menu-button');
  let mainhiddenmenu      = AllGet('.main-hidden-menu');
  let logosvg             = AllGet('.logo__svg');
  let body                = AllGet('.body');
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

});
