const title = document.querySelector('#title'),
  author = document.querySelector('#author'),
  isbn = document.querySelector('#isbn');

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = (book) => {
  const list = document.querySelector('.book-list');

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete-book">&times;</td>
  `;
  list.appendChild(row);
};

UI.prototype.clearFields = () => {
  title.value = '';
  author.value = '';
  isbn.value = '';
};

UI.prototype.showAlert = (message, className) => {
  const div = document.createElement('div');
  div.className = `msg ${className}`;

  div.appendChild(document.createTextNode(message));

  const container = document.querySelector('.u-container');
  const form = document.querySelector('.book-form');

  container.insertBefore(div, form);

  setTimeout(() => {
    document.querySelector('.msg').remove();
  }, 3000);
};

UI.prototype.deleteBook = (target) => {
  if (target.classList.contains('delete-book')) {
    target.parentElement.parentElement.remove();
  }
};

document.querySelector('.book-form').addEventListener('submit', (e) => {
  const book = new Book(title.value, author.value, isbn.value);

  const ui = new UI();

  if (title.value === '' || author.value === '' || isbn.value === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'msg--error');
  } else {
    ui.addBookToList(book);
    ui.clearFields();
    ui.showAlert('Book Added 👍', 'msg--success');
  }

  e.preventDefault();
});

document.querySelector('.book-table').addEventListener('click', (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book removed', 'msg--success');

  e.preventDefault();
});
