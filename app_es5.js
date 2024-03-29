// BOOK CONSTRUCTOR
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI CONSTRUCTOR
function UI() {}


// Add Book To List
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // create tr element
  const row = document.createElement('tr');
  // insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}



// Show alert
UI.prototype.showAlert = function(message, className) {
  // create div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent
  const container = document.querySelector('.container');
  // get form
  const form = document.querySelector('#book-form');
  // insert alert
  container.insertBefore(div, form);
  // timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}


// Delete Book 
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}


// Clear fields
UI.prototype.clearfields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


// Event Listener for add Book
document.getElementById('book-form').addEventListener('submit', function(e){
  // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
  // instantiate book
  const book = new Book(title, author, isbn);
  // instantiate UI
  const ui = new UI();
  // Validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // add book to list
    ui.addBookToList(book);
    // show success
    ui.showAlert('Book Added', 'success');
    // clear fields
    ui.clearfields();
  }
  e.preventDefault();
})


// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e){
  // instantiate UI
  const ui = new UI();
  //
  ui.deleteBook(e.target);
  // show message
  ui.showAlert('Book removed', 'success');

  e.preventDefault;
})