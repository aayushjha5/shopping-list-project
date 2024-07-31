//Global Variables
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const ClearBtn = document.querySelector('#clear');

//add item 

function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //Validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //Create List item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    //create other listitem elements i.e button and icon within button
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //adding input to list of items
    itemList.appendChild(li);

    //clearing input form after addition
    itemInput.value = '';
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;

    return icon;
}

//remove Item

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
    }
}

//Clear Items using clear button

function clearItems(e) {

    //targeting ul here
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}

//Event Listeners

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
ClearBtn.addEventListener('click', clearItems);
