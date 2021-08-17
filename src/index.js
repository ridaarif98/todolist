import './style.css';

let collection = [];
const form = document.getElementById('addTodo');

function ShowList(arr) {
  const listToDo = arr.map((b) => `
    <ul class="testList1" draggable="true">
          <li><input type="checkbox" id='${b.id}' value='${b.complete}' class="checkboX">
          <p>${b.title}</p>
          </li>
          <i class=" fa fa-ellipsis-v" id='${b.id}'></i>
          <i class="fa fa-trash-o" id='${b.id}'></i>          
      </ul>
     `).join('');
  document.getElementById('showListItem').innerHTML = `${listToDo}`;
}

function addList() {
  const todo = {
    id: collection.length,
    title: document.getElementById('todotitle').value,
    complete: false,
  };
  collection.push(todo);
  localStorage.setItem('todoList', JSON.stringify(collection));
  if (collection.length > 0) {
    ShowList(collection);
  }
  form.reset();
}

window.addEventListener('load', () => {
  const dataGet = localStorage.getItem('todoList');
  const data = JSON.parse(dataGet);
  if (data) {
    collection = data;
  }
  if (collection.length > 0) {
    ShowList(collection);
  }
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  addList();
});