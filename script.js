//Global Variables
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const ClearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');

//add item 

function onAddItemSubmit(e) {
    e.preventDefault();  //adding this to stop form from getting saved instantaneously. 

    const newItem = itemInput.value;

    //Validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //below function will take input and add it to itemList
    addItemToDOM(newItem);

    //add item to localStorage
    addItemToStorage(newItem);

    checkUI();

    //clearing input form after addition
    itemInput.value = '';
}

function addItemToDOM(item) {

    //Create List item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    //create other listitem elements i.e button and icon within button
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    //adding input li to list of items in DOM
    itemList.appendChild(li);
}

function addItemToStorage(item) {
    //check whether we already have items in localStorage
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []; //if nothing, set it to empty array
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items')); //parse the existing string to array
    }

    itemsFromStorage.push(item); // adding new  item in variable.

    //convert JSON arr into string and set it to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
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
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}

//Clear Items using clear button

function clearItems(e) {

    //targeting ul here
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    checkUI();
}

function filterItems(e) {

    //get the text typed in lowercase for matching
    const text = e.target.value.toLowerCase();

    //get the list items
    const items = itemList.querySelectorAll('li');

    items.forEach(item => {
        //for extracting name of item, we are using firstChild method as in html , the name is first child
        const itemName = item.firstChild.textContent.toLowerCase();

        //matching text in filteritem box with listitems items
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
}

function checkUI() {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        ClearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        ClearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

//Event Listeners

itemForm.addEventListener('submit', onAddItemSubmit);  //for adding item in input of form in DOM and localStorage
itemList.addEventListener('click', removeItem); // when cross icon is clicked
ClearBtn.addEventListener('click', clearItems); //when clearAll button is clicked
itemFilter.addEventListener('input', filterItems); // whenever we write something in filter Items input box



//checks whether item is there or not..
//based on that triggers if-else condition within it.
checkUI();