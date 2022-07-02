// настройки для inputmask.js
const contactPhone = document.getElementById("contactPhone");

const im = new Inputmask({"mask": "+7 (999) 999-9999"});
im.mask(contactPhone);
