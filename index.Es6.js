class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

}

class UI {
  addBooktolist(book) {
    const list = document.getElementById("book-list");
    // create tr element
    const row = document.createElement("tr");
    //insert cols

    row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="delete">X<a></td>
          `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    // create div
    const div = document.createElement("div");
    // add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    // insert alert
    container.insertBefore(div, form);

    // timeout after 3 second

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//  local storage class

class store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }
  static displaybooks() {
    const books = store.getBooks();

    books.forEach(function (book) {
      const ui = new UI();

      // add book to ui
      ui.addBooktolist(book);
    });
  }
  static addBook(book) {
    const books = store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = store.getBooks();
    books.forEach(function (book, index) {
      if(book.isbn === isbn) {
          books.splice(index, 1)
      }
    });
    localStorage.setItem("books", JSON.stringify(books));

  }
}
// dom load event
document.addEventListener("DOMContentLoaded", store.displaybooks);

// Event listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  //  get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //   instantiate book
  const book = new Book(title, author, isbn);

  //   instantiate UI
  const ui = new UI();

  //   validate
  if (title === "" || author === "" || isbn === "") {
    //    Error alert
    ui.showAlert("pleaser fill in all fields", "error");
  } else {
    //   Add book to list
    ui.addBooktolist(book);

    //   add to local storage
    store.addBook(book);

    // show successs
    ui.showAlert("Book Added!", "success");

    //   clear field
    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener fo del
document.getElementById("book-list").addEventListener("click", function (e) {
  //   instantiate UI
  const ui = new UI();

  //   delete book
  ui.deleteBook(e.target);

  // remove from ls
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //   show message
  ui.showAlert("book removed", "success");

  e.preventDefault();
});
