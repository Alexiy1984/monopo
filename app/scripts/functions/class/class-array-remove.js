module.exports = function ArrayAddRemoveClass(array, classname) {
  for (let index = 0; index < array.length; index++) {
    if (IsVisible(array[index])) {
      RemoveClass(array[index], classname);
    } else  AddClass(array[index], classname);
  }
}
