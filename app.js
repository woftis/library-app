//get UI elements
const myform = document.getElementById('newBookForm');
const modalToggles = document.querySelectorAll('.toggleModal')
const closeBtn = document.getElementById('closeModal');
const newFormBtn = document.getElementById('newBook');
const clearBtn = document.getElementById('clearForm');
const bookList = document.getElementById('bookList');

//event listeners to handle inputs
myform.addEventListener('submit', handleFormInput);
closeBtn.addEventListener('click', hideModal);
newFormBtn.addEventListener('click', displayModal);
window.addEventListener('keydown', handleKeyboardInput);
clearBtn.addEventListener('click', clearForm);
bookList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-icon')) {
        console.log(event.target.dataset.reference);
        
        deleteBook(event.target.dataset.reference);
    }
})



let myLibrary = [];

//constructor object for creating new book object
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.visibleInLibrary = false;
}

function addBookToLibrary(book, author, pages, read){
    const newBook = new Book(book, author, pages, read);
    myLibrary.push(newBook);
    generateTableContents();

}

//event executed on submission of the form to retrieve values 
function handleFormInput(event){
    //stop the form from submitting
    event.preventDefault();

    const book = this.bookName.value;
    const author = this.authorName.value;
    const pages = this.pageCount.value;
    let read ; 
    if (this.readStatus.value == 'yes') {
        read = 'Read';
    } else {
        read = 'Not Read';
    }

    //we now need to 1. add book, 2. get rid of the modal and 3. display book
    addBookToLibrary(book, author, pages, read);
    hideModal();
    clearForm();
    
}

function handleKeyboardInput(event){
    const enteredChar = event.key;

    //if the user is typing in an input field, stop the function
    if (event.target.tagName == "INPUT" && enteredChar != 'Escape') {
        return;
    }
    switch(enteredChar) {
        case 'Escape':
            hideModal();
            break;
        case 'n':
            displayModal();
            break;

    }
}

function displayModal(){
    const modal = document.getElementById('newBookModal');
    const application = document.getElementById('application-container');
    modal.style.display = 'flex';
    application.classList.add('body-blur');
}

function hideModal(){
    const modal = document.getElementById('newBookModal');
    const application = document.getElementById('application-container');
    modal.style.display = 'none';
    application.classList.remove('body-blur');

    //TBC if should also call clearForm() at this stage
}


//once book is submitted, the from should be cleared down for next time
function clearForm(){
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if(input.type == 'text' || input.type == 'number'){
            input.value = "";
        } 
    });

}

function generateTableContents(){
    const table = document.getElementById('bookList');

    //loop over each book in the library
    myLibrary.forEach(book => {
        //get reference to be added to action icons
        const bookReference = myLibrary.indexOf(book);

        //check if the book is already rendered and return if so
        //otherwise go on to render it
        if(book.visibleInLibrary) {
            return;
        }
   
        //insert a new row and at end (-1) and then set the id as the array index
        const row = table.insertRow(-1);
        row.setAttribute('id', `book-${bookReference}`)

        //then loop over each key in the object
        Object.keys(book).forEach(key => {
            //omit the visible key as we don't want that displayesd
            if(key !== 'visibleInLibrary') {
                let cell = row.insertCell() 
                cell.innerHTML = `${book[key]}`
            }
        })

        //then add on the action buttons
        row.innerHTML += `<td><div class="icon-container"><i class="fa-regular fa-pen-to-square edit-icon" data-reference="${bookReference}"></i><i class="fa-regular fa-trash-can delete-icon" data-reference="${bookReference}"></i></div></td>`;
        //add the book to the table then mark it as visible
        table.appendChild(row);
        book.visibleInLibrary = true;

    })
}




//add function to delete a book
function deleteBook(reference) {
    const table = document.getElementById('bookList');
    const bookid = `book-${reference}`
    console.log(bookid);

    myLibrary.splice(reference, 1);


    const rowToBeDeleted = document.getElementById(`${bookid}`);
    console.log(rowToBeDeleted);
    rowToBeDeleted.remove();

    console.log(myLibrary);

}
//function changeReadStatus

addBookToLibrary('The Hobbit', 'Tolkien', '304', 'Read');
addBookToLibrary('A Game of Thrones', 'G.R.R Martin', '304', 'Read');
addBookToLibrary('A Tale of Two Cities', 'Charles Dickens', '304', 'Read');
addBookToLibrary('A fantasy book', 'Brandon Sanderson', '304', 'Read');


