document.addEventListener('DOMContentLoaded', function() {

  console.log('solution java-script  file initialized');

  const AllGet          = require('../functions/get/get-all');
  const AddClass        = require('../functions/class/class-add');
  const RemoveClass     = require('../functions/class/class-remove');

  let menubutton        = AllGet('.nav-menu__menu-button');
  let mainhiddenmenu    = AllGet('.main-hidden-menu');
  let menubuttonclicked = true;

  AddClass(menubutton,'nav-menu__menu-button_nohide');

  menubutton.onclick = function() {
    if (!menubuttonclicked) {
      menubuttonclicked = true;

      AddClass(mainhiddenmenu,'_appeared');
      RemoveClass(mainhiddenmenu,'_visibility_hidden');
    } else {
      menubuttonclicked = false;

      AddClass(mainhiddenmenu,'_visibility_hidden');
      RemoveClass(mainhiddenmenu,'_appeared');
    }
  }

});
