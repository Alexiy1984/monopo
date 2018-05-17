module.exports = function AllGet(tagname) {
  let element = document.querySelectorAll(tagname);
  if (element.length <= 1) {
    return document.querySelector(tagname);
  } else return document.querySelectorAll(tagname);
}
