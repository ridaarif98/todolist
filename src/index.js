import './style.css';

let collection = [
  {
    description: 'Reading',
    completed: false,
    index: 1,
  },
  {
    description: 'Preparation for test',
    completed: false,
    index: 2,
  },
  {
    description: 'Project',
    completed: false,
    index: 3,
  },
];

localStorage.setItem('todoList', JSON.stringify(collection));

function ShowList(arr) {
  const listToDo = arr.map((b) => `
    <ul class="testList1" draggable="true">
          <li><input type="checkbox" id='${b.index}' value='${b.completed}' class="checkboX">
          <p>${b.description}</p>
          </li>
          <i class=" fa fa-ellipsis-v" id='${b.index}'></i>
          <i class="fa fa-trash-o" id='${b.index}'></i>          
      </ul>
     `).join('');
  document.getElementById('showListItem').innerHTML = `${listToDo}`;
}

if (collection.length > 0) {
  ShowList(collection);
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