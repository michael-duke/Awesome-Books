import BookValidation from './book-validation.js';
import CreateBook from './create-book.js';
import DynamicBook from './dynamic-book.js';
import Time from './time.js';
import { singlePageNav, toggleActiveLink } from './spa-navigation.js';

const dynamicBook = new DynamicBook();
class BooksCollection {
  constructor() {
    this.library = JSON.parse(localStorage.getItem('books')) || [];
  }

  // Model
  addBook(book) {
    this.library.push(book);
    this.saveCollection();
    dynamicBook.renderBooks(this.library, this);
  }

  removeBook(bookId) {
    this.library = this.library.filter(({ id }) => id !== bookId);
    this.saveCollection();
  }

  onDelete(bookToDelete) {
    this.removeBook(bookToDelete);
    dynamicBook.renderBooks(this.library, this);
    this.isCollectionEmpty();
  }

  getInput() {
    const id = this.library.length + 1;

    const bookTitle = document.getElementById('title');
    const { value: title } = bookTitle;

    const bookAuthor = document.getElementById('author');
    const { value: author } = bookAuthor;

    const bookValidation = new BookValidation();
    bookValidation.validateBook(title, author);
    const { isValid } = bookValidation;
    if (isValid) {
      const newBook = new CreateBook(id, title, author);
      this.addBook(newBook);
      dynamicBook.renderBooks(this.library, this);
      bookTitle.value = '';
      bookAuthor.value = '';
    }
  }

  isCollectionEmpty() {
    if (this.library.length === 0) dynamicBook.renderEmptyMessage();
  }

  saveCollection() {
    localStorage.setItem('books', JSON.stringify(this.library));
  }
}

/* Initialization */
const bookCollection = new BooksCollection();
bookCollection.isCollectionEmpty();

const { messageOn } = dynamicBook;
if (!messageOn) dynamicBook.renderBooks(bookCollection.library, bookCollection);
const addBtn = document.querySelector('.add-btn');
addBtn.onclick = () => bookCollection.getInput();

setInterval(Time.displayTime, 10);
singlePageNav();
toggleActiveLink();
