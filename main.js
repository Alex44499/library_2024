// Select the main library container where books will be displayed
const libraryContainer = document.querySelector(".libraryContainer");

// Select elements for showing and hiding the form
const formOverlay = document.querySelector(".form-overlay"); // Overlay container
const showFormButton = document.querySelector(".new-book"); // Button to show the form
const cancelFormButton = document.querySelector(".cancel"); // Button to cancel the form

// Select the form element
const addBookForm = document.querySelector(".add-book-form"); // Form where users add books

// Initialize the library array to store books
const myLibraryh = [];

// Constructor function for Book objects
function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

// Function to add a book to the library array
function addBookToLibrary(title, author, pages, readStatus) {
  const creatBook = new Book(title, author, pages, readStatus);
  myLibraryh.push(creatBook); // Add the new book to the library array
}

// Function to display books in the library
function displayBook() {
  libraryContainer.textContent = ""; // Clear existing content before re-rendering
  myLibraryh.forEach((book, index) => {
    // Create book card
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    // Title
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    bookCard.append(bookTitle);

    // Author
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;
    bookCard.append(bookAuthor);

    // Pages
    const bookPages = document.createElement("p");
    bookPages.textContent = `Pages: ${book.pages}`;
    bookCard.append(bookPages);

    // Read Status
    const bookStatus = document.createElement("p");
    bookStatus.textContent = `Status: ${book.readStatus}`;
    bookCard.append(bookStatus);

    // Append the card to the container
    libraryContainer.appendChild(bookCard);

    // Button container
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    //Remove button
    const removeButton = document.createElement("button");
    removeButton.classList.add("button");
    removeButton.textContent = "Remove";

    // Add event listener to remove book
    removeButton.addEventListener("click", () => {
      removeBook(index); // Call removeBook function with the correct index
      console.log(removeButton);
    });

    buttonContainer.appendChild(removeButton);

    //Toggle read status
    const toggleStatusButton = document.createElement("button");
    toggleStatusButton.textContent = "Toggle Status";
    toggleStatusButton.classList.add("button");

    // Add event listener to toggle read status
    toggleStatusButton.addEventListener("click", () => {
      toggleReadStatus(index);
    });

    buttonContainer.appendChild(toggleStatusButton);

    // Add button container to the card
    bookCard.appendChild(buttonContainer);
  });
}

// Function to remove book from the library
function removeBook(index) {
  myLibraryh.splice(index, 1);
  displayBook();
}

// Function to toggle book read status
function toggleReadStatus(index) {
  const book = myLibraryh[index];
  book.readStatus = book.readStatus === "read" ? "not read" : "read"; // Toggle the status
  displayBook(); // Refresh the display
  console.log(book);
}

// Event listener for form submission
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  // Retrieve input values
  const title = document.querySelector("#title").value; // Get the title input
  const author = document.querySelector("#author").value; // Get the author input
  const pages = parseInt(document.querySelector("#pages").value, 10); // Get and parse the pages input
  const readStatus = document.querySelector("#read").checked
    ? "read"
    : "not read"; // Get the read status

  // Validate inputs to ensure all fields are correctly filled
  if (!title || !author || isNaN(pages)) {
    alert("Please fill in all fields correctly!");
    return;
  }

  // Add the new book to the library
  addBookToLibrary(title, author, pages, readStatus);

  // Refresh the displayed library
  displayBook();

  // Clear form inputs
  addBookForm.reset();

  // Hide the form
  formOverlay.classList.add("hidden");
});

// Event listener for "New Book" button to show the form
showFormButton.addEventListener("click", () => {
  formOverlay.classList.remove("hidden"); // Show the form
});

// Event listener for "Cancel" button to hide the form
cancelFormButton.addEventListener("click", () => {
  formOverlay.classList.add("hidden"); // Hide the form
});

// Event listener to close the form with the Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    formOverlay.classList.add("hidden");
  }
});
