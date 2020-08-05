const title = document.querySelector('#title'),
  author = document.querySelector('#author'),
  isbn = document.querySelector('#isbn');

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  constructor() {}

  addBookToList(book) {
    const list = document.querySelector('.book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete-book">&times;</td>
  `;
    list.appendChild(row);
  }

  clearFields() {
    title.value = '';
    author.value = '';
    isbn.value = '';

    title.focus();
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `msg ${className}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.u-container');
    const form = document.querySelector('.book-form');

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.msg').remove();
    }, 3000);
  }

  deleteBook(target) {
    if (target.classList.contains('delete-book')) {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

    Store.addBook(book);
  }

  e.preventDefault();
});

document.querySelector('.book-table').addEventListener('click', (e) => {
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('Book removed', 'msg--success');

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});
