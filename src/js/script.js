const getData = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

const setData = (itens) => localStorage.setItem('todoList',JSON.stringify());

const createItem = (itemName, status = '', index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute('data-id', index);
    checkbox.checked = status

    const div = document.createElement('div');
    div.innerText = itemName;

    const button = document.createElement('input');
    button.setAttribute("type", "button");
    button.setAttribute('data-id', index)
    button.value = 'X';

    item.appendChild(checkbox);
    item.appendChild(div);
    item.appendChild(button);

    const todoList = document.getElementById('todoList');
    todoList.appendChild(item);
}

const cleanBoard = () => {
    const todoList = document.getElementById('todoList');
    for(let i=0; todoList.firstChild; i++){
        todoList.removeChild(todoList.lastChild);
    }
}

const updateBoard = () =>{
    cleanBoard();
    const itens = getData();
    itens.forEach( (item, index) => createItem(item.item, item.status, index));
}

const insertItem = (evt) => {
    const key = evt.key;
    const text = evt.target.value;
    if(key === 'Enter'){
        const itens = getData();
        itens.push({
            'item': text, 
            'status': '' 
        });

        setData(itens);
        updateBoard();
        evt.target.value = '';
    }
}

const removeItem = (index) => {
    itens.splice(index, 1);
    updateBoard();
}

const updateItem = (index) => {
    itens[index].status = itens[index].status === '' ? 'checked' : ''; 
    updateBoard();
}

const clickItem = (evt) => {
    const element = evt.target;
    const index = element.dataset.id;
    if(element.type === 'button'){
        removeItem(index);
    } else if(element.type === 'checkbox'){;
        updateItem(index);
    }
}

const inputNewItem = document.getElementById('newItem');
inputNewItem.addEventListener('keypress', insertItem);

const todo = document.getElementById('todoList');
todo.addEventListener('click', clickItem);

updateBoard();