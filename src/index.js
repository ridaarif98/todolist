import './style.css';
import { addList, statusCheck } from './status.js';

const form = document.getElementById('addTodo');

document.getElementById('showListItem').addEventListener('click', (e) => {
  if (e.target.classList.contains('checkboX')) {
    statusCheck(e);
  }
});


form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  addList();
})