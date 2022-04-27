// ES5 OOP USING CONTRUCTOR AND PROTOTYPE METHODS

// Book Contructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Contructor
function UI() {}

UI.prototype.addBooktolist = function (book) {
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
};

// showAlert
UI.prototype.showAlert = function(message, className){
    // create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`;
    // Add text 
    div.appendChild(document.createTextNode(message));
    // get parent
    const  container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);


    // timeout after 3 second

    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}

// delete Book
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

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
    ui.showAlert("pleaser fill in all fields", 'error');
  } else {
    //   Add book to list
    ui.addBooktolist(book);

    // show successs
    ui.showAlert('Book Added!', 'success')

    //   clear field
    ui.clearFields();
  }

  e.preventDefault();
});


// Event listener fo del
document.getElementById('book-list').addEventListener('click', function(e){
    
      //   instantiate UI
  const ui = new UI();


  ui.deleteBook(e.target);

//   show message 
ui.showAlert('book removed','success')

    e.preventDefault();
})

// .......................................



// what is OOP?
// => object oriented programming is way of writing code that allows you to create different objects from a common object .The common object is usually called blueprint while the created objects are called instances. Each instance has properties that are not shared other properties.

// Why we use OOP?
// => it also provides easy ways to creating prototypes and organize related data. true OOP languages do not perform prototyping in the background just it take note of that

//              Benefits of OOP

// 1.Encapsulaion : Reduce complexity + increase reusability
// => Group related variable and function together this way we can reduce complexity

// 2.Abstraction : Reduce complexity + isolate impact of changes
// => we hide the unnecessary details and the complexity and the show the necessary details 
// =>Exposing necessary features of a class without explaining much or details is done by Abstraction.

// 3.Inheritance: Eliminate redundant code 
// =>

// 4.Polymorphism : Refactor ugly switch/case statement
