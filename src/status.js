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
  const rtest = collection[collection.findIndex((x) => x.index === parseInt(buttonId, 10))];
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
          <li><input type="checkbox" id='${b.index}' value='${b.completed}' class="checkboX" ${b.completed ? 'checked' : 'unchecked'}>
          <p>${b.description}</p><small></small>
          </li>
          <i class=" fa fa-ellipsis-v" id='${b.index}'></i>
          <i class="fa fa-trash-o" id='${b.index}'></i>          
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
    index: collection.length + 1,
    description: document.getElementById('todotitle').value,
    completed: false,
  };
  collection.push(toDoTask);
  localStorage.setItem('todoList', JSON.stringify(collection));
  if (collection.length > 0) {
    ShowList(collection);
  }
  form.reset();
});

const editTask = ((ev) => {
  const buttonID = ev.target.id;
  const dataGet = localStorage.getItem('todoList');
  const data = JSON.parse(dataGet);
  if (data) {
    collection = data;
  }
  const btnId = collection[collection.findIndex((x) => x.index === parseInt(buttonID, 10))];
  const last = collection.indexOf(btnId);
  const test = ev.target.parentNode;
  const editInput = test.querySelector('p');
  editInput.contentEditable = true;
  editInput.classList.add('test');
  const a = test.querySelector('.fa-ellipsis-v');
  a.style.display = 'none';
  const b = test.querySelector('.fa-trash-o');
  b.style.display = 'block';
  collection[last].description = editInput.innerHTML;

  editInput.addEventListener('keyup', () => {
    if (editInput.innerHTML.length > 0) {
      const listItem = document.getElementById('showListItem');
      const errorMsg = listItem.querySelector('small');
      errorMsg.style.display = 'none';
      collection[last].description = editInput.innerHTML;
      localStorage.setItem('todoList', JSON.stringify(collection));
    } else if (editInput.innerHTML.length === 0) {
      const listItem = document.getElementById('showListItem');
      const errorMsg = listItem.querySelector('small');
      errorMsg.style.display = 'block';
      errorMsg.innerText = 'Please enter some text';
      errorMsg.classList.add('small');
    }
  });
});

const removeTodo = ((ev) => {
  const buttonId = ev.target.id;
  collection = collection.filter(
    (y) => y !== collection[collection.findIndex(
      (x) => x.index === parseInt(buttonId, 10),
    )],
  );
  collection = collection.map((el) => ({ ...el }));
  const a = 1;
  for (let i = 0; i < collection.length; i += 1) {
    collection[i].index = i + a;
  }
  localStorage.setItem('todoList', JSON.stringify(collection));
  ShowList(collection);
});

const removeCompleted = (() => {
  collection = collection.filter((y) => !y.completed).map((y) => ({ ...y }));
  const b = 1;
  for (let i = 0; i < collection.length; i += 1) {
    collection[i].index = i + b;
  }
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

export {
  statusCheck, addToList, editTask, removeTodo, removeCompleted,
};