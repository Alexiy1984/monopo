const IsVisible   = require('../conditional/is-visible');
const IsNodeList  = require('../conditional/is-nodelist');
const AddClass    = require('../class/class-add');
const RemoveClass = require('../class/class-remove');

module.exports = function PreAnimProcess(eltarr) {
  if (IsNodeList) {
    for (let i = 0; i < eltarr.length; i++) {
      eltarr[i].style.animationDelay = (i * 0.25)+'s'; 
      for (let y = 1; y < arguments.length; y++) {
        AddClass(eltarr[i],arguments[y]);
      }
      if (IsVisible(eltarr[i]) == true) {
        for (let y = 1; y < arguments.length; y++) {
          RemoveClass(eltarr[i],arguments[y]);
        }
      }
    }  
  } else {
    for (let y = 1; y < arguments.length; y++) {
      AddClass(eltarr,arguments[y]);
    }  
    if (IsVisible(eltarr) == true) {
      for (let y = 1; y < arguments.length; y++) {
        RemoveClass(eltarr,arguments[y]);
      }  
    }
  }
}
