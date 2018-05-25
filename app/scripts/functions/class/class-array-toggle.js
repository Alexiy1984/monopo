const IsVisible   = require('../conditional/is-visible');
const AddClass    = require('../class/class-add');
const RemoveClass = require('../class/class-remove');

module.exports = function ArrayToggleClass(array, classname, key) {
  if (key == 1 || 'add') {
    for (let index = 0; index < array.length; index++) {
      if (IsVisible(array[index])) {
        AddClass(array[index], classname);
      }
    }   
  } else if (key == 0 || 'rem') {
    for (let index = 0; index < array.length; index++) {
      if (IsVisible(array[index])) {
        Remove(array[index], classname);
      }
    }   
  } else {
      for (let index = 0; index < array.length; index++) {
      if (IsVisible(array[index])) {
        RemoveClass(array[index], classname);
      } else  AddClass(array[index], classname);
    }
  }
}
