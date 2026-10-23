'use strict';

/* ===== CONFIGURAZIONE: modifica solo questi valori ===== */
const CONFIG = {
  whatsapp: '39NUMERO',   // es. '393331234567' (prefisso 39 + numero, senza + né spazi)
  phone: 'NUMERO',        // es. '+390131123456' oppure '0131123456'
  defaultMessage: 'Ciao Jenio Store, vorrei verificare offerte e copertura per la mia zona.'
};
/* ======================================================== */

const waUrl = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

// Applica numeri e messaggi a tutti i link
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = waUrl(a.dataset.msg || CONFIG.defaultMessage);
});
document.querySelectorAll('[data-tel]').forEach(a => { a.href = `tel:${CONFIG.phone}`; });

// Menu hamburger
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
const setMenu = open => {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
};
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Selettore servizi -> messaggio WhatsApp
const picker = document.querySelector('.picker');
const send = document.getElementById('picker-send');
const updatePicker = () => {
  const items = [...picker.querySelectorAll('.chips input:checked')].map(i => i.value.toLowerCase());
  const who = picker.querySelector('input[name=who]:checked').value;
  const list = items.length ? items.join(', ') : 'le vostre offerte';
  const text = `Ciao Jenio Store, sono interessato a: ${list}, per ${who}. Potete verificare offerte e copertura in zona Alessandria?`;
  send.href = waUrl(text);
};
picker.addEventListener('change', updatePicker);
updatePicker();

document.getElementById('year').textContent = new Date().getFullYear();
