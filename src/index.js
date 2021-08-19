import './style.css';
import { statusCheck, addToList, editTask, removeTodo } from './status.js';
const form = document.getElementById('addTodo');
const showList = document.getElementById('showListItem');

showList.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkboX')) {
    statusCheck(e);
  }
});

showList.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-ellipsis-v')) {
    editTask(e);
  }
});

showList.addEventListener('click', (e) => {
  if(e.target.classList.contains('fa-trash-o')) {
    removeTodo(e);
  }
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  addToList();
});