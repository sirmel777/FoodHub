// Book Contructor
function Book(title, author, isbn) {
 this.title = title;
 this.author = author;
 this.isbn = isbn;
}

// UI Constructor
function UI() {}

function Store() {}

// Add Book to list
UI.prototype.addBookTolist = function(book) {
  const list = document.querySelector('#book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert Cols
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
   `;
   list.appendChild(row);
  // console.log(row);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
		// console.log('delete');
	}
};
// Clearfileds
UI.prototype.clerFields = function() {
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#isbn').value = '';
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  //  Create Div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function() {
   document.querySelector('.alert').remove();
  }, 3000);
  console.log(form);
}




// Event Listeners
document.querySelector('#book-form').addEventListener('submit', function(e) {
  //  Get form values
 const title = document.querySelector('#title').value,
  author = document.querySelector('#author').value,
  isbn = document.querySelector('#isbn').value;

  // Instantiate book
 const book = new Book(title, author, isbn);

//  Instantiate UI
const ui = new UI();

// Validate
if(title === '' || author === '' || isbn === '') {
  //  Show Alert
  ui.showAlert('Please fill in all fields', 'error');
} else {
  ui.addBookTolist(book);
  // show success
  ui.showAlert('Book Added!', 'success');
}



ui.clerFields();



 console.log(title, author, isbn);


  e.preventDefault();
});


// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
	// Instantiate UI
	const ui = new UI();

	// Delete book

	if (e.target.className === 'delete') {
		if (confirm('Are you sure?')) {
			// Show message
			ui.showAlert('Book Removed!', 'success');
			ui.deleteBook(e.target);
		}
	}

	e.preventDefault();
});

