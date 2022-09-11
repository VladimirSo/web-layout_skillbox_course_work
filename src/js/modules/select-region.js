// настройки для coices.js
const selectRegElem = document.querySelector('.region-list');

const choices = new Choices(selectRegElem, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
  labelId: '',
});
