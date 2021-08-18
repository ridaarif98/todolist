import addEventsDragAndDrop from './draging.js';

let collection = [
  {
    description: 'Reading',
    completed: false,
    id: 1,
  },
  {
    description: 'Preparation for test',
    completed: false,
    id: 2,
  },
  {
    description: 'Project',
    completed: false,
    id: 3,
  },
];

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
  localStorage.setItem('todoList', JSON.stringify(collection));
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

export { statusCheck };