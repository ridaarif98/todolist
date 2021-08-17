let collection = [];
const form = document.getElementById('addTodo');

function statusCheck(ev) {
    const buttonId = ev.target.id;
    console.log(buttonId);
    const dataGet = localStorage.getItem('todoList');
    const data = JSON.parse(dataGet);
    if (data) {
      collection = data;
    }
    const rtest = collection[collection.findIndex((x) => x.id === parseInt(buttonId, 10))];
    console.log(rtest);
    const last = collection.indexOf(rtest);
    console.log(last);
    if (collection[last].completed === false) {
      collection[last].completed = true;
    } else {
      collection[last].completed = false;
    }
    localStorage.setItem('todoList', JSON.stringify(collection));
  }
  

function ShowList(arr) {
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
}

function addList() {
    const todo = {
      id: collection.length,
      description: document.getElementById('todotitle').value,
      completed: false,
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
  
  export{ addList, statusCheck };