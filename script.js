//Global Variables
const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const ClearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
let isEditMode = false; //by default false
const formBtn = itemForm.querySelector('button');


//runs when DOM is loaded
function displayItems() {
    //get items from storage
    const itemsFromStorage = getItemsFromStorage();

    //load onto the DOM
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI(); //added so we can see Filter and Clearall when DOM is loaded

}


//add item 

function onAddItemSubmit(e) {
    e.preventDefault();  //adding this to stop form from getting saved instantaneously. 

    const newItem = itemInput.value;

    //Validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    //check for edit mode // if yes, remove it from storage and DOM and add the new item
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();

        isEditMode = false;
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

function addItemToStorage(item) {
    //check whether we already have items in localStorage
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item); // adding new  item in variable.

    //convert JSON arr into string and set it to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//get items from localStorage

function getItemsFromStorage() {
    //check whether we already have items in localStorage
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []; //if nothing, set it to empty array
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items')); //parse the existing string to array
    }

    return itemsFromStorage;

}
// onClick item

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;  //enable isEditMode to true

    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode'); //changes css for item
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';  //update button contents
    formBtn.style.backgroundColor = '#228B22';

    //update itemInput
    itemInput.value = item.textContent;  // item input takes text value of clicked list item

}


//remove Item

function removeItem(item) {
    if (confirm('Are you sure ?')) {
        //remove from DOM
        item.remove();

        //remove item from localStorage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item) {
    //first get items from localstorage
    let itemsFromStorage = getItemsFromStorage();

    //filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //re-set to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//Clear Items using clear button

function clearItems(e) {

    //targeting ul here
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    //clear from localStorage
    localStorage.removeItem('items');

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

    itemInput.value = ''; // clears input on check
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        ClearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        ClearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';

    isEditMode = false;
}


//Initialize app

function init() {

    //Event Listeners

    itemForm.addEventListener('submit', onAddItemSubmit);  //for adding item in input of form in DOM and localStorage
    itemList.addEventListener('click', onClickItem); // when cross icon is clicked
    ClearBtn.addEventListener('click', clearItems); //when clearAll button is clicked
    itemFilter.addEventListener('input', filterItems); // whenever we write something in filter Items input box
    document.addEventListener('DOMContentLoaded', displayItems); //display items when DOM is loaded


    //checks whether item is there or not..
    //based on that triggers if-else condition within it.
    checkUI();
}

init();


