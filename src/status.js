import addEventsDragAndDrop from './draging.js';

let collection = [];
const form = document.getElementById('addTodo');

const statusCheck = ((ev) => {
  const buttonId = ev.target.id;
  const dataGet = localStorage.getItem('todoList');
  const data = JSON.parse(dataGet);
  if (data) {
    collection = data;
  }
  const rtest = collection[collection.findIndex((x) => x.id === parseInt(buttonId, 10))];
  const last = collection.indexOf(rtest);
  if (collection[last].completed === false) {
    collection[last].completed = true;
  } else {
    collection[last].completed = false;
  }
  localStorage.setItem('todoList', JSON.stringify(collection));
});

const ShowList = ((arr) => {
  const listToDo = arr.map((b) => `
    <ul class="testList1" draggable="true">
          <li><input type="checkbox" id='${b.id}' value='${b.completed}' class="checkboX" ${b.completed ? 'checked' : 'unchecked'}>
          <p>${b.description}</p>
          </li>
          <i class=" fa fa-ellipsis-v" id='${b.id}'></i>
          <i class="fa fa-trash-o" id='${b.id}'></i>          
      </ul>
     `).join('');
  document.getElementById('showListItem').innerHTML = `${listToDo}`;
  const test = document.querySelectorAll('.testList1');
  test.forEach((li) => {
    addEventsDragAndDrop(li);
  });
});

const addToList = (() => {
  const toDoTask = {
    id : collection.length,
    description : document.getElementById('todotitle').value,
    completed : false,
  }
  collection.push(toDoTask);
  localStorage.setItem('todoList', JSON.stringify(collection));
  if(collection.length > 0){
    ShowList(collection);
  }
  form.reset();
});

const removeTodo = ((ev) => {
  const buttonId = ev.target.id;
  collection = collection.filter(
    (y) => y !== collection[collection.findIndex(
      (x) => x.id === parseInt(buttonId, 10),
    )],
  );
  collection = collection.map((el, id) => ({ ...el, id }));
  localStorage.setItem('todoList', JSON.stringify(collection));
  ShowList(collection);
});

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

export { statusCheck, addToList, removeTodo } ;